const pool = require('../database/db');

// ADD PRODUCT
const addProduct = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const image = req.file ? req.file.filename : null;

        const result = await pool.query(
            "INSERT INTO products(name,description,price,image) VALUES($1,$2,$3,$4) RETURNING *",
            [name, description, price, image]
        );

        res.json({
            message: "Product added",
            product: result.rows[0]
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET ALL PRODUCTS
const getAllProducts = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM products");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DELETE PRODUCT
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            "DELETE FROM products WHERE id=$1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json({
            message: "Product deleted",
            product: result.rows[0]
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// IMPORTANT: export only what exists above
module.exports = {
    addProduct,
    getAllProducts,
    deleteProduct
};