const {
    getCartByUser,
    addToCart,
    removeFromCart
} = require('../model/cartModel');

const getCart = async (req, res) => {
    try {
        const userId = req.user.id;

        const cart = await getCartByUser(userId);

        res.json({
            message: "Cart fetched",
            cart
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
const addItem = async (req, res) => {
    try {
        const userId = req.user.id;
        const { product_id, quantity } = req.body;

        const item = await addToCart(userId, product_id, quantity);

        res.json({
            message: "Added to cart",
            item
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
const removeItem = async (req, res) => {
    try {
        const { id } = req.params;

        const item = await removeFromCart(id);

        res.json({
            message: "Removed from cart",
            item
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getCart,
    addItem,
    removeItem
};