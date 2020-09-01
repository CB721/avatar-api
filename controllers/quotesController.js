const db = require("../db_connection/index");
const cache = require("memory-cache");
const { validateUUID, saveRequest, createCacheKey, sendRes } = require("../utils/index");

module.exports = {
    // get a random quote
    // can filter by character, episode or season
    all: async (req, res) => {
        // get the content-type from the request
        const contentType = req.accepts(['json', 'application/json']);
        // if json was not requested, send back error
        if (!contentType) return res.status(406).send('Not Acceptable');
        // check for valid API request before proceeding
        const key = req.get('key');
        if (!key) return res.status(401).send("Invalid API key");
        let userID;
        await validateUUID(key)
            .then(res => userID = res.id)
            .catch(err => res.status(401).send("Invalid API key"));
        const charID = parseInt(req.query.charid);
        const episodeID = parseInt(req.query.episodeid);
        const seasonID = parseInt(req.query.seasonid);
        // check cache for no results response
        const noResponseCache = cache.get(createCacheKey("quote", { charID }, { episodeID }, { seasonID }));
        // if something is saved, return the no results response
        if (noResponseCache) return res.status(200).json(noResponseCache);
        // check cache for saved data
        const savedCache = cache.get(createCacheKey("quote", { key }, { charID }, { episodeID }, { seasonID }));
        // if something is saved, return the saved data
        if (savedCache) return res.status(200).json(savedCache);
        let query = {
            text: "SELECT body, char_name, c.title AS episode_title, c.id AS episode_id, c.fk_season AS season_num FROM quote a INNER JOIN character b ON a.fk_char_id = b.id INNER JOIN episode c ON a.fk_episode_id = c.id WHERE TRUE = TRUE",
            values: []
        }
        // if a character id was passed and it is a number
        if (charID && Number.isInteger(charID)) {
            // push id into array
            query.values.push(charID);
            // add to query text
            // set the value to the length of what already exists in the array
            // if the length is 2 it would result in $2 put into the string since it has already been add to the array
            query.text += ` AND a.fk_char_id = $${query.values.length}`;
        }
        // if a episode id was passed and it is a number
        if (episodeID && Number.isInteger(episodeID)) {
            // push id into array
            query.values.push(episodeID);
            // add to query text
            // set the value to the length of what already exists in the array
            // if the length is 2 it would result in $2 put into the string since it has already been add to the array
            query.text += ` AND a.fk_episode_id = $${query.values.length}`;
        }
        // if the season id was passed and it is a number
        // if a episode id was passed and it is a number
        if (seasonID && Number.isInteger(seasonID)) {
            // push id into array
            query.values.push(seasonID);
            // add to query text
            // set the value to the length of what already exists in the array
            // if the length is 2 it would result in $2 put into the string since it has already been add to the array
            query.text += ` AND c.fk_season = $${query.values.length}`;
        }
        // grab a random quote from the results
        query.text += " ORDER BY RANDOM() LIMIT 1;"
        await db.query(query, (err, data) => {
            if (err) {
                return sendRes(res, err.message, 500);
            } else if (!data.rows.length) {
                saveRequest(userID)
                    .then(() => {
                        // save data to cache
                        cache.put(createCacheKey("quote", { charID }, { episodeID }, { seasonID }), "No results.  Check your parameters and try again.");
                        res.status(204).send("No results.  Check your parameters and try again.");
                    })
                    .catch(err => sendRes(res, err, 500));
            } else {
                saveRequest(userID)
                    .then(() => {
                        // save data to cache for one minute
                        cache.put(createCacheKey("quote", { key }, { charID }, { episodeID }, { seasonID }), data.rows[0], 60000);
                        // send response
                        sendRes(res, data.rows[0], 200);
                    })
                    .catch(err => sendRes(res, err, 500));
            }
        });
    }
}