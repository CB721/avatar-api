const db = require("../db_connection/index");
const { validateUUID, validateEmail, sendRes } = require("../utils/index");

// all requests to these routes must come from a whitelisted source
module.exports = {
    // create a new user
    create: (req, res) => {
        let { first_name, last_name, email } = req.body;
        validateEmail(email)
            .then()
            .catch(err => res.status(401).send("Invalid email"));
        // check if both a first and last name were submitted
        if (!first_name || !last_name) return res.status(400).send("First and last name are required");
        // change names to lowercase
        first_name = first_name.toLowerCase();
        last_name = last_name.toLowerCase();
        // once a user is successfully added, the generated api key will be sent back
        const query = {
            text: "INSERT INTO users(first_name, last_name, email) VALUES($1, $2, $3) RETURNING api_key;",
            values: [first_name, last_name, email]
        }
        db.query(query, (err, data) => {
            // if the email submitted already exists, send an error
            if (err && err.message === `duplicate key value violates unique constraint "users_email_key"`) {
                sendRes(res, { error: "Email already exists" }, 409);
            } else if (err) {
                sendRes(res, { error: err.message }, 500);
            } else {
                sendRes(res, data.rows[0], 200);
            }
        });
    },
    // specific route for requesting a new key
    newKey: async (req, res) => {
        // since all emails will be unique, we can look up the user by email and api key
        const { email, key } = req.body;
        if (!email || !key) return res.status(400).send("Email and API key required");
        // add to user id when the api key is validated
        let userID = 0;
        // check if the key is a valid uuid
        await validateUUID(key)
            .then(res => userID = res)
            .catch(err => res.status(401).send("Invalid API key"));
        // check if email is valid
        await validateEmail(email)
            .then()
            .catch(err => res.status(401).send("Invalid email"));
        // query to update the user key, it will return the new key to the user
        const query = {
            text: "UPDATE users SET api_key = uuid_generate_v4 () WHERE id = $1 RETURNING api_key;",
            values: [userID]
        }
        await db.query(query, (err, data) => {
            if (err) {
                sendRes(res, { error: err.message }, 500);
            } else if (!data.rows.length) {
                sendRes(res, { error: "User not found" }, 404);
            } else {
                sendRes(res, data.rows[0], 201);
            }
        });
    },
    // delete user
    delete: async (req, res) => {
        // expecting email and api key
        const { email, key } = req.body;
        if (!email || !key) return res.status(400).send("Email and API key required");
        // check if the key is a valid uuid
        await validateUUID(key)
            .then()
            .catch(err => res.status(401).send("Invalid API key"));
        // check if email is valid
        await validateEmail(email)
            .then()
            .catch(err => res.status(401).send("Invalid email"));
        // query to delete user
        const query = {
            text: "DELETE FROM users WHERE email = $1 AND api_key = $2;",
            values: [email, key]
        }
        await db.query(query, (err, data) => {
            if (err) {
                sendRes(res, { error: err.message }, 500);
            } else {
                sendRes(res, { message: "User account deleted" }, 204);
            }
        });
    }
}