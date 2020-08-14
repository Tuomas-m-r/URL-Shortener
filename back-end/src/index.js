const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const sql = require("mssql/msnodesqlv8");
const config = require("./dbConfig.js");
const shortid = require("shortid");
const { json } = require("express");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Hello!");
});

app.post("/shorten", (req, res) => {
    sql.connect(config, (err) => {
        if(err){
            console.log(err);
        }

        let id = shortid.generate();
        let request = new sql.Request();
        let sqlQuery = "SELECT * FROM Url WHERE OriginalUrl='" + req.body.originalUrl + "'";
        request.query(sqlQuery, (err, data) => {
            if(err) {
                console.log(err);
                sql.close();
            }

            if(JSON.stringify(data.recordset) === "[]"){
                sqlQuery = "INSERT INTO Url (OriginalURL, ShortID, ShortURL) VALUES ('" + req.body.originalUrl + "', '" + id + "', 'http://localhost:5000/" + id + "')";
                request.query(sqlQuery, (err) => {
                    if(err){
                        console.log(err);
                        sql.close();
                    }
                });     
            }
            
            sqlQuery = "SELECT ShortURL FROM Url WHERE OriginalURL='" + req.body.originalUrl + "'";
            request.query(sqlQuery, (err, data) =>{
                if(err){
                    console.log(err);
                    sql.close();
                } else {
                    console.log("Your shortened link is: " + data.recordset[0].ShortURL);
                    res.send(data.recordset[0].ShortURL);
                    sql.close();
                }
            });
        });
    });
});

app.get("/:id", (req, res) =>{
    sql.connect(config, (err) => {
        if(err){
            console.log(err);
        }

        let request = new sql.Request();
        let sqlQuery = "SELECT OriginalURL FROM Url WHERE ShortID='" + req.params.id + "'";
        request.query(sqlQuery, (err, data) => {
            if(err) {
                console.log(err);
                sql.close();
            } else {
                const json = JSON.stringify(data.recordset[0]);
                const result = JSON.parse(json);
                res.redirect(result.OriginalURL);
                sql.close();
            }
        });
    });
});

app.listen(5000, () => {
    console.log("Serveri käynnistetty portissa 5000.");
});