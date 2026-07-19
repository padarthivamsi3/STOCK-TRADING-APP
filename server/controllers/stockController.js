const {
    searchStocks,
    getQuote,
    getCompanyProfile,
    getStockHistory
} = require("../services/stockService");

// Search Stocks
const getAllStocks = async (req, res) => {
    try {
        const query = req.query.search;
        if (!query) {
            return res.status(400).json({
                success: false,
                message: "Search query is required."
            });
        }
        const stocks = await searchStocks(query);
        res.status(200).json({
            success: true,
            stocks
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Stock Details
const getSingleStock = async (req, res) => {
    try {
        const symbol = req.params.symbol;
        const quote = await getQuote(symbol);
        const profile = await getCompanyProfile(symbol);
        res.status(200).json({
            success: true,
            quote,
            profile
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get Stock Historical Data
const getStockHistoryController = async (req, res) => {
  try {
    const { symbol } = req.params;
    let { resolution = "D", from, to } = req.query;

    // Default to last 1 year if from/to not provided
    let toNum = to ? Number(to) : Math.floor(Date.now() / 1000);
    let fromNum = from ? Number(from) : (toNum - (365 * 24 * 60 * 60));
    
    // Sanitize numbers
    if (!Number.isFinite(toNum)) {
      toNum = Math.floor(Date.now() / 1000);
    }
    if (!Number.isFinite(fromNum) || fromNum >= toNum) {
      fromNum = toNum - (365 * 24 * 60 * 60); // 1 year ago
    }

    console.log('Fetching stock history for:', { symbol, resolution, from: fromNum, to: toNum });
    const history = await getStockHistory(symbol, resolution, fromNum, toNum);
    console.log('History response:', history);
    
    res.status(200).json({
      success: true,
      history
    });
  } catch (error) {
    console.error('Error fetching stock history:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: error.message,
      details: error.response?.data
    });
  }
};

module.exports = {
    getAllStocks,
    getSingleStock,
    getStockHistoryController
};