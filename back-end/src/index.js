const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const sql = require("mssql/msnodesqlv8");
const config = require("./dbConfig.js");
const shortid = require("shortid");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Hello!");
});

app.post("/shorten", (req, res) => {
    sql.connect(config, (err) => {
        if (err){
            console.log(err);
        } else {
            console.log("Tietokanta yhteys avattu.");
        }

        let request = new sql.Request();
        let sqlQuery = "SELECT * FROM Url WHERE OriginalUrl='" + req.body.originalUrl + "'";
        request.query(sqlQuery, (err, data) => {
            if(err) {
                console.log(err);
                sql.close();
            }
            console.log(JSON.stringify(data.recordset));
            if(JSON.stringify(data.recordset) === "[]"){
                let id = shortid.generate();
                sqlQuery = "INSERT INTO Url (OriginalURL, ShortID, ShortURL) VALUES ('" + req.body.originalUrl + "', '" + id + "', 'http://localhost:3000/" + id + "')";
                request.query(sqlQuery, (err, data) => {
                    if(err){
                        console.log(err);
                        sql.close();
                    }
                });
            }
        });
    });
});

app.listen(5000, () => {
    console.log("Serveri käynnistetty portissa 5000.");
});