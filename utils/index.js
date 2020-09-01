const db = require("../db_connection/index");
const cache = require("memory-cache");
module.exports = {
    validateUUID: (uuid) => {
        return new Promise((resolve, reject) => {
            // a valid uuid is either 32 or 36 characters long, reject it
            if (uuid.length !== 32 && uuid.length !== 36) reject(false);
            // regex for a valid uuid
            const regex = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
            // if the string is not valid uuid, reject it
            if (!regex.test(uuid)) reject(false)
            // otherwise, check the database to see if one can be found
            else {
                // check cache for previously verified user
                const cachedUser = cache.get(`user_${uuid}`);
                // if a user has been verified, return the cached id
                if (cachedUser) resolve(cachedUser);
                // query to find the api key and return the user id
                const query = {
                    text: "SELECT id FROM users WHERE api_key = $1;",
                    values: [uuid]
                }
                db.query(query, (err, data) => {
                    if (err) {
                        // if there is an error, reject it
                        reject(false);
                        // if no rows were found, reject it
                    } else if (!data.rows.length) {
                        reject(false);
                    } else {
                        // save data to cache for one minute
                        cache.put(`user_${uuid}`, data.rows[0]);
                        resolve(data.rows[0]);
                    }
                })
            }
        });
    },
    validateEmail: (email) => {
        return new Promise((resolve, reject) => {
            if (!email) reject(false);
            // regex pattern to check for a valid email address
            const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            // check if the email submitted is valid
            if (!emailRegex.test(email)) reject(false)
            else resolve(true);
        });
    },
    saveRequest: (id) => {
        return new Promise((resolve, reject) => {
            if (!id) reject();
            const query = {
                text: "INSERT INTO requests (user_id) VALUES ($1);",
                values: [id]
            }
            db.query(query, (err, data) => {
                if (err) reject(err)
                else resolve();
            });
        });
    },
    createCacheKey: (table, ...filters) => {
        let keys = "";
        filters.forEach(filter => {
            keys += Object.entries(filter).join("_");
        })
        return `${table}_${keys}`;
    },
    sendRes: (res, data, status) => {
        res.format({
            'application/json': () => {
                res.status(status).send(data)
            },
            'json': () => {
                res.status(status).send(data)
            }
        })
    }
}