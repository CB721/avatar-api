module.exports = {
    validateUUID: (uuid) => {
        return new Promise((resolve, reject) => {
            // a valid uuid is either 32 or 36 characters long, reject it
            if (uuid.length !== 32 && uuid.length !== 36) reject(false);
            // regex for a valid uuid
            const regex = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
            // if the string is not valid uuid, reject it
            if (!regex.test(uuid)) reject(false)
            // otherwise, it is valid
            else resolve(true);
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
    }
}