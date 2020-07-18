const db = require("../db_connection/index");

module.exports = {
    // get all seasons by title and id
    all: (req, res) => {
        db.query("SELECT season_num, title FROM season;", (err, data) => {
            if (err) {
                return res.status(500).send(err.message);
            } else {
                return res.status(200).json(data.rows);
            }
        });
    },
    // get one season with how many total episodes and which series it is in
    one: (req, res) => {
        const ID = req.query.id;
        if (isNaN(ID)) return res.status(400).send("Season ID required");
        const query = {
            text: "SELECT a.title AS season_title, b.title AS series_title, (SELECT COUNT(*) FROM episode WHERE fk_season = $1 GROUP BY fk_season) AS episode_count FROM season a INNER JOIN series b ON a.series_num = b.series_num WHERE season_num = $1;",
            values: [ID]
        }
        db.query(query, (err, data) => {
            if (err) {
                return res.status(500).send(err.message);
            } else if (!data.rows.length) {
                return res.status(204).send("Invalid season ID");
            } else {
                return res.status(200).json(data.rows[0]);
            }
        });
    }
}