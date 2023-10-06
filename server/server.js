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


// Bookings table
app.get("/bookings", async function (req, res) {
  const query = "SELECT * FROM bookings";
  const errorMessage = "Internal server error";
  await handleDatabaseQuery(res, query, errorMessage);
});

// Add new volunteer on one of the sessions and update bookings table
app.post(
  "/sessions/volunteers",
  [
    body("name", "Name can't be empty").notEmpty(),
    body("lastname", "Last Name can't be empty").notEmpty(),
    body("address", "Address can't be empty").notEmpty(),
    body("day", "Day can't be empty").notEmpty(),
    body("time", "Time can't be empty").notEmpty(),
  ],
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({
        error: errors.array(),
      });
    }

    const newName = req.body.name;
    const newLastName = req.body.lastname;
    const newAddress = req.body.address;
    const newDay = req.body.day;
    const newTime = req.body.time;

    // Insert the new volunteer into the volunteers table
    const volunteerQuery =
      "INSERT INTO volunteers (name, lastname, address) VALUES ($1, $2, $3) RETURNING id";

    db.query(
      volunteerQuery,
      [newName, newLastName, newAddress],
      (volunteerErr, volunteerResult) => {
        if (volunteerErr) {
          return res.status(500).json({ error: "Internal server error" });
        }

        const volunteerId = volunteerResult.rows[0].id;

        // Update the bookings table with the new volunteer
        const bookingQuery =
          "INSERT INTO bookings (volunteer_id, day, time) VALUES ($1, $2, $3)";

        db.query(
          bookingQuery,
          [volunteerId, newDay, newTime],
          (bookingErr, bookingResult) => {
            if (bookingErr) {
              return res.status(500).json({ error: "Internal server error" });
            }

            res.status(201).json({ message: "Volunteer added successfully" });
          }
        );
      }
    );
  }
);


// Route to add a volunteer to a session
app.post(
  '/sessions/volunteers',
  [
    body('name').notEmpty().withMessage("Name can't be empty"),
    body('email').notEmpty().withMessage("Email can't be empty"),
    body('phone_number').notEmpty().withMessage("Phone_number can't be empty"),
    body('address').notEmpty().withMessage("Address can't be empty"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone_number, address } = req.body;

    // Insert the new volunteer into the volunteers table
    try {
      const volunteerQuery =
        'INSERT INTO volunteers (name, email, phone_number, address ) VALUES ($1, $2, $3, $4) RETURNING id';
      const volunteerResult = await db.query(volunteerQuery, [name, email, phone_number, address ]);
      const volunteerId = volunteerResult.rows[0].id;

      // Update the bookings table with the new volunteer
      const bookingQuery = 'INSERT INTO bookings (volunteer_id, date, time) VALUES ($1, $2, $3)';
      await db.query(bookingQuery, [volunteerId, date, time]);

      res.status(201).json({ message: 'Volunteer added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

