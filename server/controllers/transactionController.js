const Transaction = require("../models/transactionSchema");
const User = require("../models/userSchema");

const depositMoney = async (req, res) => {
    try {
        const { amount, paymentMethod } = req.body;
        const userId = req.user.id;

        if (!amount || !paymentMethod) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields."
            });
        }

        if (amount < 1) {
            return res.status(400).json({
                success: false,
                message: "Amount must be at least 1."
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        const transaction = await Transaction.create({
            user: userId,
            type: "deposit",
            paymentMethod,
            amount
        });

        user.balance += amount;
        await user.save();

        res.status(201).json({
            success: true,
            message: "Money deposited successfully.",
            transaction
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const withdrawMoney = async (req, res) => {
    try {
        const { amount, paymentMethod } = req.body;
        const userId = req.user.id;

        if (!amount || !paymentMethod) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields."
            });
        }

        if (amount < 1) {
            return res.status(400).json({
                success: false,
                message: "Amount must be at least 1."
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        if (user.balance < amount) {
            return res.status(400).json({
                success: false,
                message: "Insufficient balance."
            });
        }

        const transaction = await Transaction.create({
            user: userId,
            type: "withdraw",
            paymentMethod,
            amount
        });

        user.balance -= amount;
        await user.save();

        res.status(201).json({
            success: true,
            message: "Money withdrawn successfully.",
            transaction
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getTransactions = async (req, res) => {
    try {
        const userId = req.user.id;
        const transactions = await Transaction.find({ user: userId }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            transactions
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    depositMoney,
    withdrawMoney,
    getTransactions
};
