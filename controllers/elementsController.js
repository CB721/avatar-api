const db = require("../db_connection/index");
const cache = require("memory-cache");
const { createCacheKey, sendRes } = require("../utils");

module.exports = {
    // get all elements
    all: (req, res) => {
        // check cache for saved data
        const savedCache = cache.get(createCacheKey("ele"));
        // if something is saved, return the saved data
        if (savedCache) return res.status(200).json(savedCache);
        db.query("SELECT * FROM element;", (err, data) => {
            if (err) {
                sendRes(res, { error: err.message }, 500);
            } else {
                // save data to cache
                cache.put(createCacheKey("ele"), data.rows);
                sendRes(res, data.rows, 200);
            }
        });
    }
}