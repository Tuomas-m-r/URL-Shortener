const sql = require("mssql/msnodesqlv8");
const config = require("./dbConfig.js");

function connectDB() {

    let connection = new sql.ConnectionPool(config);

    connection.connect((err) => {
        if(err) {
            console.log(err);
        } else {
            console.log("Yhdistetty tietokantaan: " + config.server);
        }
    });
};

module.exports = connectDB;