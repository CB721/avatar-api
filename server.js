const express = require("express");
require('dotenv').config();
const PORT = process.env.PORT || 8080;
const app = express();
const connection = require("./db_connection/index");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => {
    console.log(`API server is on port ${PORT}`);
    connection.query("SELECT * FROM character", (err, res) => {
        if (err) {
            console.log(err.stack);
        } else {
            console.log(res.rows[0]);
        }
    })
});