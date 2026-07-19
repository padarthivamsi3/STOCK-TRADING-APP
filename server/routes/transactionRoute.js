const express = require("express");
const router = express.Router();

const {
    depositMoney,
    withdrawMoney,
    getTransactions,
} = require("../controllers/transactionController");

const authMiddleware = require("../middlewares/authMiddleware");

// Protected Routes
router.post("/deposit", authMiddleware, depositMoney);
router.post("/withdraw", authMiddleware, withdrawMoney);
router.get("/", authMiddleware, getTransactions);

module.exports = router;