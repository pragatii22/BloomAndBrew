const pool = require('../database/db');

// GET USER ORDERS
const getOrders = async (req, res) => {

    try {
        const user_id = req.user.id;

        const result = await pool.query(

            `SELECT
                orders.id,
                orders.quantity,
                products.name,
                products.price,
                products.image
            FROM orders
            JOIN products
            ON orders.product_id = products.id
            WHERE orders.user_id=$1
            ORDER BY orders.id DESC`,
            [user_id]
        );
        res.json({
            orders: result.rows
        });
    }

    catch(err){
        res.status(500).json({
            error: err.message
        });
    }
};

// PLACE ORDER FROM CART
const checkout = async (req, res) => {
    try {
        const user_id = req.user.id;

        const cartItems = await pool.query(
            "SELECT * FROM cart WHERE user_id=$1",
            [user_id]
        );

        if (cartItems.rows.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        for (let item of cartItems.rows) {
            await pool.query(
                "INSERT INTO orders(user_id, product_id, quantity) VALUES($1,$2,$3)",
                [user_id, item.product_id, item.quantity]
            );
        }

        await pool.query("DELETE FROM cart WHERE user_id=$1", [user_id]);

        res.json({ message: "Order placed successfully" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { checkout, getOrders };