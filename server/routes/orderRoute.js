const express = require("express");
const router = express.Router();

const {
    buyStock,
    sellStock,
    getOrders,
    getOrderById,
    cancelOrder,
} = require("../controllers/orderController");

const authMiddleware = require("../middlewares/authMiddleware");

// Protected Routes
router.post("/buy", authMiddleware, buyStock);
router.post("/sell", authMiddleware, sellStock);
router.get("/", authMiddleware, getOrders);
router.get("/:id", authMiddleware, getOrderById);
router.delete("/:id", authMiddleware, cancelOrder);

module.exports = router;