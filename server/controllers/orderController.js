const Order = require("../models/orderSchema");
const User = require("../models/userSchema");
const { getQuote } = require("../services/stockService");

const buyStock = async (req, res) => {
    try {
        const { symbol, name, count, stockType } = req.body;
        const userId = req.user.id;

        if (!symbol || !name || !count || !stockType) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields."
            });
        }

        const quote = await getQuote(symbol);
        const price = quote.c;
        const totalPrice = price * count;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        if (user.balance < totalPrice) {
            return res.status(400).json({
                success: false,
                message: "Insufficient balance."
            });
        }

        const order = await Order.create({
            user: userId,
            symbol,
            name,
            price,
            count,
            totalPrice,
            stockType,
            orderType: "BUY",
            orderStatus: "Completed"
        });

        user.balance -= totalPrice;

        const existingHolding = user.portfolio.find(h => h.symbol === symbol);
        if (existingHolding) {
            const totalCount = existingHolding.count + count;
            const totalCost = (existingHolding.avgPrice * existingHolding.count) + (price * count);
            existingHolding.avgPrice = totalCost / totalCount;
            existingHolding.count = totalCount;
        } else {
            user.portfolio.push({
                symbol,
                name,
                count,
                avgPrice: price
            });
        }

        await user.save();

        res.status(201).json({
            success: true,
            message: "Stock bought successfully.",
            order
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const sellStock = async (req, res) => {
    try {
        const { symbol, name, count, stockType } = req.body;
        const userId = req.user.id;

        if (!symbol || !name || !count || !stockType) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields."
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        const holding = user.portfolio.find(h => h.symbol === symbol);
        if (!holding || holding.count < count) {
            return res.status(400).json({
                success: false,
                message: "Insufficient stocks to sell."
            });
        }

        const quote = await getQuote(symbol);
        const price = quote.c;
        const totalPrice = price * count;

        const order = await Order.create({
            user: userId,
            symbol,
            name,
            price,
            count,
            totalPrice,
            stockType,
            orderType: "SELL",
            orderStatus: "Completed"
        });

        user.balance += totalPrice;

        if (holding.count === count) {
            user.portfolio = user.portfolio.filter(h => h.symbol !== symbol);
        } else {
            holding.count -= count;
        }

        await user.save();

        res.status(201).json({
            success: true,
            message: "Stock sold successfully.",
            order
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            orders
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;
        const userId = req.user.id;

        const order = await Order.findOne({ _id: orderId, user: userId });
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found."
            });
        }

        res.status(200).json({
            success: true,
            order
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const cancelOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const userId = req.user.id;

        const order = await Order.findOne({ _id: orderId, user: userId });
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found."
            });
        }

        if (order.orderStatus !== "Pending") {
            return res.status(400).json({
                success: false,
                message: "Only pending orders can be cancelled."
            });
        }

        order.orderStatus = "Cancelled";
        await order.save();

        res.status(200).json({
            success: true,
            message: "Order cancelled successfully.",
            order
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    buyStock,
    sellStock,
    getOrders,
    getOrderById,
    cancelOrder
};
