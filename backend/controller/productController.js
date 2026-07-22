const pool = require('../database/db');

// ADD PRODUCT
const addProduct = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const image = req.file ? req.file.filename : null;

        if (!name || !name.trim()) {
            return res.status(400).json({ message: "Product name is required" });
        }
        const numericPrice = Number(price);
        if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
            return res.status(400).json({ message: "Price must be a positive number" });
        }

        const result = await pool.query(
            "INSERT INTO products(name,description,price,image) VALUES($1,$2,$3,$4) RETURNING *",
            [name.trim(), description, numericPrice, image]
        );

        res.status(201).json({
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
        const result = await pool.query("SELECT * FROM products ORDER BY id DESC");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET SINGLE PRODUCT
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("SELECT * FROM products WHERE id=$1", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// UPDATE PRODUCT
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price } = req.body;

        const existing = await pool.query("SELECT * FROM products WHERE id=$1", [id]);
        if (existing.rows.length === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        const numericPrice = price !== undefined ? Number(price) : existing.rows[0].price;
        if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
            return res.status(400).json({ message: "Price must be a positive number" });
        }

        const image = req.file ? req.file.filename : existing.rows[0].image;

        const result = await pool.query(
            `UPDATE products SET name=$1, description=$2, price=$3, image=$4 WHERE id=$5 RETURNING *`,
            [
                name?.trim() || existing.rows[0].name,
                description ?? existing.rows[0].description,
                numericPrice,
                image,
                id
            ]
        );

        res.json({
            message: "Product updated",
            product: result.rows[0]
        });
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

module.exports = {
    addProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};
