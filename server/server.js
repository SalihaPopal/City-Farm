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
  database: "business-problem-city-farm",
  password: "",
  port: 5432,
});

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

  app.post("/volunteers", (req, res) => {
    const newId = req.body.volunteer_id; 
    const newName = req.body.full_name; 
    const newEmail = req.body.email_address; 
    const newPhone = req.body.phone_number; 
  
    const query =
      `INSERT INTO volunteers (full_name, email_address, phone_number)
      VALUES ($1, $2, $3, $4) RETURNING volunteer_id`;
  
    db.query(query, [newId, newName, newEmail, newPhone]) 
      .then(() => {
        res.status(201).send("Created a new volunteer");
      })
      .catch(err => {
        console.log(err);
      });
  });

  app.get("/bookings", async (req, res) => {
    try {
      const result = await db.query("SELECT * FROM bookings")
      res.status(200).json(result.rows);
    } catch (error) {
      console.log(error);
    }
  });

  app.get("/managers", async (req, res) => {
    try {
      const result = await db.query("SELECT * FROM managers")
      res.status(200).json(result.rows);
    } catch (error) {
      console.log(error);
    }
  });


// const port = process.env.PORT || 5000;
// app.listen(port, () => console.log(`Listening on port ${port}`));
