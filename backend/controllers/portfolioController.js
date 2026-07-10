import PortfolioItem from '../models/PortfolioItem.js';
import Transaction from '../models/Transaction.js';
import User from '../models/User.js';

export const getPortfolio = async (req, res) => {
  try {
    const items = await PortfolioItem.find({ userId: req.user._id });
    res.json({ portfolio: items });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const buyStock = async (req, res) => {
  try {
    const { symbol, companyName, quantity, price } = req.body;
    const user = await User.findById(req.user._id);
    const total = quantity * price;
    if (user.virtualBalance < total) return res.status(400).json({ message: 'Insufficient balance' });

    let item = await PortfolioItem.findOne({ userId: req.user._id, symbol });
    if (!item) {
      item = await PortfolioItem.create({ userId: req.user._id, symbol, companyName, quantity, averagePrice: price, currentPrice: price, profitLoss: 0 });
    } else {
      const newQuantity = item.quantity + quantity;
      const newAvg = ((item.averagePrice * item.quantity) + (price * quantity)) / newQuantity;
      item.quantity = newQuantity;
      item.averagePrice = newAvg;
      item.currentPrice = price;
      await item.save();
    }

    user.virtualBalance -= total;
    await user.save();
    await Transaction.create({ userId: req.user._id, symbol, buyOrSell: 'buy', price, quantity });
    res.json({ message: 'Purchase successful', item });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const sellStock = async (req, res) => {
  try {
    const { symbol, quantity, price } = req.body;
    const item = await PortfolioItem.findOne({ userId: req.user._id, symbol });
    if (!item || item.quantity < quantity) return res.status(400).json({ message: 'Insufficient shares' });

    item.quantity -= quantity;
    item.currentPrice = price;
    item.profitLoss = (price - item.averagePrice) * quantity;
    if (item.quantity === 0) await item.deleteOne();
    else await item.save();

    const user = await User.findById(req.user._id);
    user.virtualBalance += quantity * price;
    await user.save();
    await Transaction.create({ userId: req.user._id, symbol, buyOrSell: 'sell', price, quantity });
    res.json({ message: 'Sale successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
