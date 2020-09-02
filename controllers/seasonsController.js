const db = require("../db_connection/index");
const cache = require("memory-cache");
const { createCacheKey, sendRes } = require("../utils");

module.exports = {
    // get all seasons by title and id
    all: (req, res) => {
        const ID = req.query.id;
        if (ID && (isNaN(ID) || ID > 7 || ID < 0)) {
            return res.status(400).send("Invalid Season ID");
        } else if (ID) {
            // get one season with how many total episodes and which series it is in
            // check cache for saved data
            const savedCache = cache.get(createCacheKey("sea", { ID }));
            // if something is saved, return the saved data
            if (savedCache) return res.status(200).json(savedCache);
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
                    // save data to cache
                    cache.put(createCacheKey("sea", { ID }), data.rows[0]);
                    sendRes(res, data.rows[0], 200);
                }
            });
        } else {
            // check cache for saved data
            const savedCache = cache.get(createCacheKey("sea"));
            // if something is saved, return the saved data
            if (savedCache) return res.status(200).json(savedCache);
            db.query("SELECT season_num, title FROM season;", (err, data) => {
                if (err) {
                    return res.status(500).send(err.message);
                } else {
                    // save data to cache
                    cache.put(createCacheKey("sea"), data.rows);
                    return res.status(200).json(data.rows);
                }
            });
        }
    }
}