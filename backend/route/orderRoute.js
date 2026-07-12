const router = require("express").Router();

const verifyToken = require("../middleware/authMiddleware");

const {
    checkout,
    getOrders
} = require("../controller/orderController");

router.post("/checkout", verifyToken, checkout);

router.get("/", verifyToken, getOrders);

module.exports = router;