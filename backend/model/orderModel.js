const pool = require('../database/db');

const STATUSES = ['pending', 'confirmed', 'processing', 'delivered', 'cancelled'];

// Creates an order + its line items in a single transaction, then empties the cart.
// cartItems: [{ product_id, name, image, price, quantity }]
const createOrderFromCart = async (userId, cartItems, { address, phone, paymentMethod, notes }) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const total = cartItems.reduce(
            (sum, item) => sum + Number(item.price) * Number(item.quantity),
            0
        );

        const orderResult = await client.query(
            `INSERT INTO orders(user_id, total, status, address, phone, payment_method, notes)
             VALUES($1, $2, 'pending', $3, $4, $5, $6)
             RETURNING *`,
            [userId, total, address, phone, paymentMethod, notes || null]
        );
        const order = orderResult.rows[0];

        for (const item of cartItems) {
            await client.query(
                `INSERT INTO order_items(order_id, product_id, name, image, price, quantity)
                 VALUES($1, $2, $3, $4, $5, $6)`,
                [order.id, item.product_id, item.name, item.image, item.price, item.quantity]
            );
        }

        await client.query('DELETE FROM cart WHERE user_id = $1', [userId]);

        await client.query('COMMIT');

        return { ...order, items: cartItems };
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};

const getOrdersByUser = async (userId) => {
    const ordersResult = await pool.query(
        `SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC`,
        [userId]
    );
    return attachItems(ordersResult.rows);
};

const getAllOrders = async () => {
    const ordersResult = await pool.query(
        `SELECT orders.*, users.name AS customer_name, users.email AS customer_email
         FROM orders
         JOIN users ON orders.user_id = users.id
         ORDER BY orders.created_at DESC`
    );
    return attachItems(ordersResult.rows);
};

const attachItems = async (orders) => {
    if (orders.length === 0) return [];

    const ids = orders.map((o) => o.id);
    const itemsResult = await pool.query(
        `SELECT * FROM order_items WHERE order_id = ANY($1::int[])`,
        [ids]
    );

    const itemsByOrder = {};
    for (const item of itemsResult.rows) {
        if (!itemsByOrder[item.order_id]) itemsByOrder[item.order_id] = [];
        itemsByOrder[item.order_id].push(item);
    }

    return orders.map((o) => ({ ...o, items: itemsByOrder[o.id] || [] }));
};

const updateOrderStatus = async (orderId, status) => {
    const result = await pool.query(
        `UPDATE orders SET status = $1 WHERE id = $2 RETURNING *`,
        [status, orderId]
    );
    return result.rows[0];
};

module.exports = {
    STATUSES,
    createOrderFromCart,
    getOrdersByUser,
    getAllOrders,
    updateOrderStatus
};
