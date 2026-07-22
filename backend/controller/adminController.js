const pool = require('../database/db');
// Real aggregate numbers for the admin dashboard — no mocked stats.
const getStats = async (req, res) => {
    try {
        const [productsCount, usersCount, orderStats] = await Promise.all([
            pool.query("SELECT COUNT(*)::int AS count FROM products"),
            pool.query("SELECT COUNT(*)::int AS count FROM users"),
            pool.query(
                `SELECT
                    COUNT(*)::int AS total_orders,
                    COALESCE(SUM(total) FILTER (WHERE status != 'cancelled'), 0) AS revenue,
                    COUNT(*) FILTER (WHERE status = 'pending')::int AS pending_orders
                 FROM orders`
            )
        ]);
        res.json({
            totalProducts: productsCount.rows[0].count,
            totalUsers: usersCount.rows[0].count,
            totalOrders: orderStats.rows[0].total_orders,
            pendingOrders: orderStats.rows[0].pending_orders,
            revenue: Number(orderStats.rows[0].revenue)
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getStats };
