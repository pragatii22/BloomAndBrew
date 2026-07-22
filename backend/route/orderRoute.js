const router = require("express").Router();

const verifyToken = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/roleMiddleware");

const {
    checkout,
    getOrders,
    getAllOrdersAdmin,
    setOrderStatus
} = require("../controller/orderController");

router.post("/checkout", verifyToken, checkout);

router.get("/", verifyToken, getOrders);

router.get("/admin/all", verifyToken, adminOnly, getAllOrdersAdmin);
router.patch("/admin/:id/status", verifyToken, adminOnly, setOrderStatus);

module.exports = router;
