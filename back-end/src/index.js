const express = require("express");
const app = express();
const connectDB = require("./db.js");

app.get("/", (req, res) => {
   connectDB();
});

app.post("/shorten", (req, res) => {

});

app.listen(5000, () => {
    console.log("Serveri käynnistetty portissa 5000.");
});