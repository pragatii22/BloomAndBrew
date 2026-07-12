const pool = require('../database/db');

const addProductDB = async (name, description, price, image) => {
    const result = await pool.query(
        "INSERT INTO products(name,description,price,image) VALUES($1,$2,$3,$4) RETURNING *",
        [name, description, price, image]
    );
    return result.rows[0];
};

const getProductsDB = async () => {
    const result = await pool.query("SELECT * FROM products");
    return result.rows;
};

module.exports = { addProductDB, getProductsDB };