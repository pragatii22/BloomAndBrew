const pool = require('../database/db');
const {
    STATUSES,
    createOrderFromCart,
    getOrdersByUser,
    getAllOrders,
    updateOrderStatus
} = require('../model/orderModel');

// GET USER ORDERS
const getOrders = async (req, res) => {
    try {
        const orders = await getOrdersByUser(req.user.id);
        res.json({ orders });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// PLACE ORDER FROM CART — server calculates the total from real DB prices,
// never trusts a price supplied by the client, and commits the order +
// its line items + cart cleanup as a single transaction.
const checkout = async (req, res) => {
    try {
        const userId = req.user.id;
        const { address, phone, payment_method, notes } = req.body;

        if (!address || !address.trim()) {
            return res.status(400).json({ message: "Delivery address is required" });
        }
        if (!phone || !phone.trim()) {
            return res.status(400).json({ message: "Contact phone number is required" });
        }
        const paymentMethod = ['cod', 'stripe'].includes(payment_method) ? payment_method : 'cod';

        const cartResult = await pool.query(
            `SELECT cart.quantity, products.id AS product_id, products.name, products.image, products.price
             FROM cart
             JOIN products ON cart.product_id = products.id
             WHERE cart.user_id = $1`,
            [userId]
        );

        if (cartResult.rows.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        for (const item of cartResult.rows) {
            if (!Number.isFinite(Number(item.quantity)) || Number(item.quantity) <= 0) {
                return res.status(400).json({ message: `Invalid quantity for ${item.name}` });
            }
        }

        const order = await createOrderFromCart(userId, cartResult.rows, {
            address: address.trim(),
            phone: phone.trim(),
            paymentMethod,
            notes
        });

        res.status(201).json({
            message: "Order placed successfully",
            order
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ADMIN: all orders across all users
const getAllOrdersAdmin = async (req, res) => {
    try {
        const orders = await getAllOrders();
        res.json({ orders });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ADMIN: update order status
const setOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!STATUSES.includes(status)) {
            return res.status(400).json({ message: `Status must be one of: ${STATUSES.join(', ')}` });
        }

        const order = await updateOrderStatus(id, status);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json({ message: "Order status updated", order });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { checkout, getOrders, getAllOrdersAdmin, setOrderStatus };
