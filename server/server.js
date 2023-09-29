const {body, validationResult} = require('express-validator')
const bodyParser = require("body-parser");
const express = require('express');
const cors = require('cors');
const app = express();


// Middleware to parse JSON request bodies
app.use(cors({
    origin: ['https://www.section.io', 'https://www.google.com/']
}));

app.use(cors({
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  next();
});

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;
app.listen(() => console.log(`Listening on port ${port}`));


require("dotenv").config();
const { Client } = require('pg');

// const db = new Client({
//   port: process.env.DB_PORT,
//   host: process.env.DB_HOSTNAME,
//   user: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DBDATABASE_NAME,
//   ssl:process.env.DB_SSL
// });


const db = new Client({
  user: "salihapopal",
  host: "localhost",
  database: "business-problem",
  password: "",
  port: 4321,
});

db.connect(function (err){
  if (err) {
    console.error(err);
  };
  console.log("Connected to the database");
});



app.get("/",function (req,res) {
  res.status(200).json("Hello")
  })
  
  app.get('/sessions', async (req,res) => {
    try {
      const result = await db.query("SELECT * FROM sessions");
  
      if (result.rows.length === 0) {
        return res.json([]);
      }
      res.json(result.rows);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  })
  
  app.get("/users", async (req, res) => {
   
    try {
      const result = await db.query("SELECT * FROM users");
      if (result.rows.length === 0) {
        return res.json([]);
      }
      res.json(result.rows);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get('/users/:user_id', (req, res) => {
    const userId = Number(req.params.id)
    db.query("SELECT * FROM users WHERE id = $1", [userId])
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });
  })

 // Could not add columns
  app.get('/sessions/:session_id', (req, res) => {
    const sessionId = Number(req.params.id)
    db.query("SELECT * FROM sessions WHERE id = $1", [sessionId])
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });
  });

  app.get('/volunteers/:volunteer_id', (req, res) => {
    const volunteerId = Number(req.params.id)
    db.query("SELECT * FROM volunteers WHERE id = $1", [volunteerId])
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });
  })



// app.get("/sessions", (req, res) => {
//   let claimedSession;

//   // Find an available session and claim it
//   db.query(
//     "UPDATE sessions SET session_status = 'Claimed' WHERE session_id = (SELECT session_id FROM sessions WHERE session_status = 'Available' AND (morning_shift = true OR evening_shift = true) LIMIT 1) RETURNING *;"
//   )
//     .then((result) => {
//       // Check if a session was successfully claimed
//       if (result.rows.length > 0) {
//         claimedSession = result.rows[0];
//         return db.query("SELECT * FROM volunteers");
//       } else {
//         return Promise.reject("No available sessions to claim.");
//       }
//     })
//     .then((userResult) => {
//       res.status(200).json({
//         Users: userResult.rows,
//         ClaimedSession: claimedSession,
//       });
//     })
//     .catch((error) => {
//       console.error(error);
//       res.status(500).json({ error: "An error occurred." });
//     });
// });

app.post('/sessions/claim-session', async (req, res) => {
  try {
    const { session_id, volunteer_id } = req.body;

    // Check if the session is available
    const sessionResult = await db.query(
      'SELECT * FROM sessions WHERE session_id = $1 AND session_id NOT IN (SELECT session_id FROM session_signups)',
      [session_id]
    );

    if (sessionResult.rows.length === 0) {
      return res.status(404).json({ error: 'Session not found or already claimed' });
    }
    
    await db.query(
      'INSERT INTO session_signups (session_id, volunteer_id) VALUES ($1, $2)',
      [session_id, volunteer_id]
    );

    res.status(200).json({ message: 'Session claimed successfully' });
  } catch (error) {
    console.error('Error claiming session:', error);
    res.status(500).json({ error: 'An error occurred while claiming the session' });
  }
});


// Route to allow a volunteer to claim an available session
app.post('/sessions/claim-session/:sessionId/:volunteerId', async (req, res) => {
  try {
    
   // Check if the session is available
    const sessionId = req.body;
    const sessionResult = await db.query(
      'SELECT * FROM sessions WHERE session_id = $1 AND session_id NOT IN (SELECT session_id FROM session_signups)',
      [sessionId]
    );

    if (sessionResult.rows.length === 0) {
      return res.status(404).json({ error: 'Session not found or already claimed' });
    }
    
    await db.query(
      'INSERT INTO session_signups (signup_id, session_id, volunteer_id) VALUES ($1, $2)',
      [sessionId, volunteerId, signup_id]
    );

    res.status(200).json({ message: 'Session claimed successfully' });
  } catch (error) {
    console.error('Error claiming session:', error);
    res.status(500).json({ error: 'An error occurred while claiming the session' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// app.get("/sessions/:id", async (req, res) => {
//   try {
//     const sessionId = req.params.id;

//     // Retrieve the session by its ID
//     const sessionResult = await db.query(
//       "SELECT * FROM sessions WHERE session_id = $1",
//       [sessionId]
//     );

//     if (sessionResult.rows.length === 0) {
//       return res.status(404).json({ error: "Session not found" });
//     }

//     const session = sessionResult.rows[0];

//     res.status(200).json({
//       Session: session,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "An error occurred." });
//   }
// });



// app.put("sessions/claimSession/:id", async (req, res) => {
//   try {
//     const sessionId = req.params.id;
//     const volunteerId = req.user.id; // Assuming you have user authentication

//     // Find the session by ID
//     const session = await db.query(session_id);

//     if (!session) {
//       return res.status(404).json({ error: 'Session not found' });
//     }

//     if (session.claimedBy) {
//       return res.status(400).json({ error: 'Session already claimed' });
//     }

//     session.claimedBy = volunteerId;
//     await session.save();

//     res.json({ message: 'Session claimed successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


// exports.getAllSessions = async (req, res) => {
//   try {
//     const sessions = await db.query('SELECT * FROM sessions WHERE  IS NULL');
//     return res.json(sessions);
//   } catch (err) {
//     console.error(err); // Log the error for debugging purposes
//     return res.status(500).json({ error: 'Internal Server Error' });
//   }
// };
