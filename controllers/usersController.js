const db = require("../db_connection/index");

module.exports = {
    // create a new user
    create: (req, res) => {
        const { first_name, last_name, email } = req.body;
        // regex pattern to check for a valid email address
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        // check if the email submitted is valid
        if (!emailRegex.test(email)) return res.status(400).send("Invalid email");
        // check if both a first and last name were submitted
        if (!first_name || !last_name) return res.status(400).send("First and last name are required");
        // once a user is successfully added, the generated api key will be sent back
        const query = {
            text: "INSERT INTO users(first_name, last_name, email) VALUES($1, $2, $3) RETURNING api_key;",
            values: [first_name, last_name, email]
        }
        db.query(query, (err, data) => {
            // if the email submitted already exists, send an error
            if (err && err.message === `duplicate key value violates unique constraint "users_email_key"`) {
                return res.status(409).send("Email already exists");
            } else if (err) {
                return res.status(500).send(err.message);
            } else {
                return res.status(200).json(data.rows[0]);
            }
        });
    },
    // update user information and request a new key
    update: (req, res) => {
        
    },
    // delete user
    delete: (req, res) => {

    }
}