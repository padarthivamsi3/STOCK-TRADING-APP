const express = require("express");
const router = express.Router();

const {
    getAllStocks,
    getSingleStock,
    getStockHistoryController
} = require("../controllers/stockController");

// Public Routes

// Search stocks
// Example: GET /api/stocks?search=apple
router.get("/", getAllStocks);

// Get stock details
// Example: GET /api/stocks/AAPL
router.get("/:symbol", getSingleStock);

// Get stock historical data
// Example: GET /api/stocks/AAPL/history?resolution=D&from=1622505600&to=1625097600
router.get("/:symbol/history", getStockHistoryController);

module.exports = router;