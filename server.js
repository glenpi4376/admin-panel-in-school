const express = require("express");
const app = express();
const cors = require("cors");




const allowedurl = 'http://localhost:3000';
const corsOptions = {
    origin: allowedurl,
    methods: 'GET, POST, PUT, PATCH, DELETE',
    credentials: true
};
app.use(cors(corsOptions));  // creating object of cors library
app.use(express.json());


//sets the request limit 
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 2 minutes
  max: 50, // Max of 50 requests per IP within the windowMs
  message: 'Too many requests from this IP, please try again after 2 minutes',
  standardHeaders: true,// Return rate limit info in the RateLimit-* headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});


app.use(limiter);



//db connection start
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/project");
const db = mongoose.connection;

db.on("error",(error) => console.log("Error in database connection"));
db.on("open",() => console.log("Database is Connected..."));


const adminapi = require("./adminapi");
app.use("/admin", adminapi); 

const admissionapi = require("./admissionapi");
app.use("/admission", admissionapi);

const transportapi = require("./transportapi");
app.use("/transport", transportapi);


const examapi = require("./examinationapi");
app.use("/examination", examapi);

const employeeapi = require("./employeeapi");
app.use("/employee", employeeapi);

const feeCollection = require("./feecollectionapi");
app.use("/feeCollection", feeCollection);

const transportUserapi = require("./transportUserapi");
app.use("/transportUsers", transportUserapi);


app.listen(1111, function(){
    console.log("Server is Live")
});