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
//   database: "business-problem",
//   password: "",
//   port: 5432,
// });

db.connect(function (err){
  if (err) {
    console.error(err);
  };
  console.log("Connected to the database");
});



app.get("/",function (req,res) {
  res.status(200).json("Hello")
  });


  app.get("/sessions", async (req, res) => {
    try {
      const result = db.query("SELECT * FROM sessions")
      res.status(200).json({ customers: result.rows });
    } catch (error) {
      console.log(error);
    }
  });



  app.put("/sessions/:session_id", async (req, res) => {
    try {
      const updatedQuery =
        "UPDATE sessions SET session_status = true WHERE session_id = $1";
      const { session_id } = req.params; 
      await db.update(updatedQuery, [session_id]);
      res.status(200).json({ success: true, message: "Booking confirmed" });
    } catch (error) {
      console.error(error); 
      res.status(500).json({ error: "Something went wrong." });
    }
  });
  

  app.get("/volunteers", async (req, res) => {
    try {
      const result = db.query("SELECT * FROM vollunteers")
      res.status(200).json({ customers: result.rows });
    } catch (error) {
      console.log(error);
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



