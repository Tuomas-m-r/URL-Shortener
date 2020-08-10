const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connectDB = require("./db.js");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

connectDB();

app.get("/", (req, res) => {
    res.send("Hello!");
});

app.post("/shorten", (req, res) => {
    
});

app.listen(5000, () => {
    console.log("Serveri käynnistetty portissa 5000.");
});