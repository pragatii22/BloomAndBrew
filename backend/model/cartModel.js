const pool = require('../database/db');

const getCartByUser = async (userId) => {
    const result = await pool.query(
        `SELECT 
            cart.id as cart_id,
            cart.quantity,
            products.id as product_id,
            products.name,
            products.price,
            products.image
        FROM cart
        JOIN products ON cart.product_id = products.id
        WHERE cart.user_id = $1`,
        [userId]
    );

    return result.rows;
};
const addToCart = async (userId, productId, quantity) => {
    const existing = await pool.query(
        `SELECT * FROM cart WHERE user_id = $1 AND product_id = $2`,
        [userId, productId]
    );

    if (existing.rows.length > 0) {
        const newQuantity = existing.rows[0].quantity + Number(quantity);

        if (newQuantity <= 0) {
            const removed = await pool.query(
                `DELETE FROM cart WHERE id = $1 RETURNING *`,
                [existing.rows[0].id]
            );
            return removed.rows[0];
        }

        const result = await pool.query(
            `UPDATE cart SET quantity = $1 WHERE id = $2 RETURNING *`,
            [newQuantity, existing.rows[0].id]
        );

        return result.rows[0];
    }

    const result = await pool.query(
        `INSERT INTO cart(user_id, product_id, quantity)
         VALUES($1, $2, $3)
         RETURNING *`,
        [userId, productId, quantity]
    );

    return result.rows[0];
};
const removeFromCart = async (cartId, userId) => {
    const result = await pool.query(
        `DELETE FROM cart WHERE id = $1 AND user_id = $2 RETURNING *`,
        [cartId, userId]
    );

    return result.rows[0];
};

module.exports = {
    getCartByUser,
    addToCart,
    removeFromCart
};