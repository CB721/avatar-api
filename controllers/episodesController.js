const db = require("../db_connection/index");
const cache = require("memory-cache");
const { createCacheKey } = require("../utils");

module.exports = {
    // get a list of all episodes with the name and id
    all: (req, res) => {
        // each page of episodes will contain 5
        // there are currently 61 episodes - would be more if the second series is added
        const page = req.query.page;
        // if the page param is not a number, return an error
        if (isNaN(page)) return res.status(404).send("You must send a page query parameter");
        if (page > 13) return res.status(404).send("Page does not exist.  Max page is 13.");
        // check cache for saved data
        const savedCache = cache.get(createCacheKey("epi", { page }));
        // if something is saved, return the saved data
        if (savedCache) return res.status(200).json(savedCache);
        const offset = (page * 5) - 5;
        const query = {
            text: "SELECT id, title FROM episode ORDER BY id OFFSET $1 ROWS FETCH NEXT 5 ROWS ONLY;",
            values: [offset]
        }
        db.query(query, (err, data) => {
            if (err) {
                return res.status(500).send(err.message);
            } else {
                // save data to cache
                cache.put(createCacheKey("epi", { page }), data.rows);
                return res.status(200).json(data.rows);
            }
        });
    },
    // get single episode with name, chapter number and season
    one: (req, res) => {
        const ID = req.query.id;
        if (isNaN(ID)) return res.status(400).send("Episode ID required");
        // check cache for saved data
        const savedCache = cache.get(createCacheKey("epi", { ID }));
        // if something is saved, return the saved data
        if (savedCache) return res.status(200).json(savedCache);
        const query = {
            text: "SELECT chapter_num, a.title AS episode_name, season.title AS season_name FROM episode a INNER JOIN season ON a.fk_season = season.season_num WHERE id = $1;",
            values: [ID]
        }
        db.query(query, (err, data) => {
            if (err) {
                return res.status(500).send(err.message);
            } else if (!data.rows.length) {
                return res.status(204).send("Invalid episode ID");
            } else {
                // save data to cache
                cache.put(createCacheKey("epi", { ID }), data.rows[0]);
                return res.status(200).json(data.rows[0]);
            }
        });
    }
}