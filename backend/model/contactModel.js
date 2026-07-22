const pool = require('../database/db');

const createContactMessage = async (name, email, message) => {
    const result = await pool.query(
        "INSERT INTO contact_messages(name, email, message) VALUES($1,$2,$3) RETURNING *",
        [name, email, message]
    );
    return result.rows[0];
};

module.exports = { createContactMessage };
