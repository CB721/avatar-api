const db = require("../db_connection/index");

module.exports = {
    // get all characters by name and id
    all: (req, res) => {
        db.query('SELECT id, char_name FROM character;', (err, data) => {
            if (err) {
                return res.status(500).send(err.message);
            } else {
                return res.status(200).json(data.rows);
            }
        });
    },
    // get full character information by id
    one: (req, res) => {
        const ID = req.query.id;
        if (isNaN(ID)) return res.status(400).send("Character ID required");
        const query = {
            text: "SELECT char_name, image_link, age, (SELECT ARRAY(SELECT ele_type FROM element a, (SELECT id, can_bend FROM character) b WHERE b.can_bend @> ARRAY[a.id]::SMALLINT[] AND b.id = $1) AS elements) FROM character WHERE id = $1;",
            values: [ID]
        }
        db.query(query, (err, data) => {
            if (err) {
                return res.status(500).send(err.message);
            } else if (!data.rows.length) {
                return res.status(204).send("Invalid character ID");
            } else {
                return res.status(200).json(data.rows[0]);
            }
        });
    }
}