const db = require("../db_connection/index");
const cache = require("memory-cache");
const { createCacheKey } = require("../utils");

module.exports = {
    // get all elements
    all: (req, res) => {
        // check cache for saved data
        const savedCache = cache.get(createCacheKey("ele"));
        // if something is saved, return the saved data
        if (savedCache) return res.status(200).json(savedCache);
        db.query("SELECT * FROM element;", (err, data) => {
            if (err) {
                return res.status(500).send(err.message);
            } else {
                // save data to cache
                cache.put(createCacheKey("ele"), data.rows);
                return res.status(200).json(data.rows);
            }
        });
    }
}