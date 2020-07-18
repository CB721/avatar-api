const db = require("../db_connection/index");

module.exports = {
    // get all elements
    all: (req, res) => {
        db.query("SELECT * FROM element;", (err, data) => {
            if (err) {
                return res.status(500).send(err.message);
            } else {
                return res.status(200).json(data.rows);
            }
        });
    }
}