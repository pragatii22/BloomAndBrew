const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const {
  getCart,
  addItem,
  removeItem
} = require("../controller/cartController");

router.get("/", verifyToken, getCart);
router.post("/add", verifyToken, addItem);
router.delete("/:id", verifyToken, removeItem);

module.exports = router;