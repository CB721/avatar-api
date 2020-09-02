const db = require("../db_connection/index");
const cache = require("memory-cache");
const { createCacheKey, sendRes } = require("../utils");

module.exports = {
    // get all characters by name and id
    all: (req, res) => {
        // option to get list of characters by element
        const elementID = req.query.element;
        let queryStr = "SELECT id, char_name FROM character"
        if (elementID && elementID > 0 && elementID < 10) {
            queryStr += ` WHERE can_bend @> ARRAY[${elementID}]::SMALLINT[]`
        }
        queryStr += " ORDER BY id;";
        // check cache for saved data
        const savedCache = cache.get(createCacheKey("char", { elementID }));
        // if something is saved, return the saved data
        if (savedCache) return res.status(200).json(savedCache);
        db.query(queryStr, (err, data) => {
            if (err) {
                return res.status(500).send(err.message);
            } else {
                // save data to cache
                cache.put(createCacheKey("char", { elementID }), data.rows);
                sendRes(res, data.rows, 200);
            }
        });
    },
    // get full character information by id
    one: (req, res) => {
        const ID = req.query.id;
        if (isNaN(ID)) return res.status(400).send("Character ID required");
        // check cache for saved data
        const savedCache = cache.get(createCacheKey("char", { ID }));
        // if something is saved, return the saved data
        if (savedCache) return res.status(200).json(savedCache);
        const query = {
            text: "SELECT char_name, image_links, age, (SELECT ARRAY(SELECT ele_type FROM element a, (SELECT id, can_bend FROM character) b WHERE b.can_bend @> ARRAY[a.id]::SMALLINT[] AND b.id = $1) AS elements) FROM character WHERE id = $1;",
            values: [ID]
        }
        db.query(query, (err, data) => {
            if (err) {
                sendRes(res, { error: err.message }, 500);
            } else if (!data.rows.length) {
                sendRes(res, { error: "Invalid character ID" }, 204);
            } else {
                // add legal jargon to character object
                const charObj = data.rows[0];
                charObj["copyright"] = "All images belong their respective owners. Do not use for commercial purposes.";
                // save data to cache
                cache.put(createCacheKey("char", { ID }), data.rows[0]);
                sendRes(res, data.rows[0], 200);
            }
        });
    }
}