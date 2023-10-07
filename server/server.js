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
app.listen(port, () => console.log(`Listening on port ${port}`));


require("dotenv").config();
const { Client } = require('pg');

const db = new Client({
  port: process.env.DB_PORT,
  host: process.env.DB_HOSTNAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DBDATABASE_NAME,
  ssl:process.env.DB_SSL
});


// const db = new Client({
//   user: "salihapopal",
//   host: "localhost",
//   database: "business-problem-city-farm",
//   password: "",
//   port: 5432,
// });

db.connect(function (err){
  if (err) {
    console.error(err);
  };
  console.log("Connected to the database");
});



app.get("/",(req,res)=> {
  res.send("Hello")
  });


  app.get("/sessions", async (req, res) => {
    try {
      const result = await db.query("SELECT * FROM sessions")
      res.status(200).json(result.rows);
    } catch (error) {
      console.log(error);
    }
  });

  app.get("/volunteers", async (req, res) => {
    try {
      const result = await db.query("SELECT * FROM volunteers")
      res.status(200).json(result.rows );
    } catch (error) {
      console.log(error);
    }
  });

  // app.put("/sessions/:session_id", async (req, res) => {
  //   try {
  //     const updatedQuery =
  //       "UPDATE sessions SET session_status = not available WHERE session_id = $1";
  //     const { session_id } = req.params; 
  //     await db.update(updatedQuery, [session_id]);
  //     res.status(200).json({ success: true, message: "Booking confirmed" });
  //   } catch (error) {
  //     console.error(error); 
  //     res.status(500).json({ error: "Something went wrong." });
  //   }
  // });
  
  // app.get("/bookings", async function (req, res) {
  //   const query = "SELECT * FROM bookings";
  //   const errorMessage = "Internal server error";
  //   await handleDatabaseQuery(res, query, errorMessage);
  // });

  
// app.post("/volunteers", function (req, res) {
//   const newFirst_name = req.body.first_name;
//   const newLast_name = req.body.last_name;
//   const newEmail = req.body.email;
//   const newPhone_number = req.body.phone;
//   const newAddress = req.body.address;

//   const query =
//     `INSERT INTO customers (first_name, last_name, email, phone_number, address)
//     VALUES ($1, $2, $3, $4, $5)`;
//     if (newFirst_name 
//        && newLast_name 
//        && validator.isEmail(newEmail)
//        && req.body.phone_number 
//        && newPhone_number.replace(/[+\-()0-9 ]/g, "0") != "0".padEnd(newPhone_number.length, "0") // // replace all valid chars with 0
//        && req.body.address) {
//   db.query(query, [newFirst_name, newLast_name, newEmail, newPhone_number, newAddress])
//     .then(() => {
//       res.status(201).send("Registered a new volunteer");
//     })
//     .catch(error => {
//       console.log(error);
//     })
//   }
// });


// app.post("/sessions/volunteers", async (req, res) => {

//   try {
//     const {newFirst_Name, newLast_Name, newPhone_number, newEmail, newAddress} = req.body;
//       const query =
//         'INSERT INTO volunteers (first_name, last_name, email, phone_number, address ) VALUES ($1, $2, $3, $4, $5) RETURNING id';
//     const response = await db.query(query, [newFirst_Name, newLast_Name, newPhone_number, newEmail, newAddress]);
//.    const volunteerId = response.rows[0].id;
//     res.status(201).send({message: "New volunteer has been registered successfully"});
//   } catch (error) {
//     console.log("newVol");
//     res.status(500).send({
//       result: "failure",
//       message: "Error. New volunteer details could not be saved",
//     });
  
//   }
 
// });



// Route to add a volunteer to a session
// app.post(
//   '/sessions/volunteers',
//   [
//     body('first_name').notEmpty().withMessage("Name can't be empty"),
//     body('last_name').notEmpty().withMessage("Name can't be empty"),
//     body('email').notEmpty().withMessage("Email can't be empty"),
//     body('phone_number').notEmpty().withMessage("Phone_number can't be empty"),
//     body('address').notEmpty().withMessage("Address can't be empty"),
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { first_name, last_name, email, phone_number, address } = req.body;

//     // Insert the new volunteer into the volunteers table
//     try {
//       const volunteerQuery =
//         'INSERT INTO volunteers (first_name, last_name, email, phone_number, address ) VALUES ($1, $2, $3, $4, $5) RETURNING id';
//       const volunteerResult = await db.query(volunteerQuery, [first_name, last_name, email, phone_number, address ]);
//       const volunteerId = volunteerResult.rows[0].id;

//       // Update the bookings table with the new volunteer
//       const bookingQuery = 'INSERT INTO bookings (volunteer_id, date, time) VALUES ($1, $2, $3)';
//       await db.query(bookingQuery, [volunteerId, date, time]);

//       res.status(201).json({ message: 'Volunteer added successfully' });e
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   }
// );

// Endpoint to claim a session
// app.post('sessions/claim-session', (req, res) => {
//   const { sessionId, volunteerId } = req.body;

//   // Check if the session with the given sessionId exists
//   const session = sessions.find((session) => session.session_id === sessionId);

//   if (!session) {
//     return res.status(404).json({ message: 'Session not found' });
//   }

//   // Check if the session is already claimed
//   if (session.status === 'Claimed') {
//     return res.status(400).json({ message: 'Session is already claimed' });
//   }

//   // Mark the session as claimed and store the volunteerId
//   session.status = 'Claimed';
//   session.claimedBy = volunteerId;

//   // You can update your database here with the claimed session information

//   return res.status(200).json({ message: 'Session claimed successfully' });
// });


// const port = process.env.PORT || 5000;
// app.listen(port, () => console.log(`Listening on port ${port}`));
