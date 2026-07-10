import WatchlistItem from '../models/WatchlistItem.js';

export const getWatchlist = async (req, res) => {
  try {
    const items = await WatchlistItem.find({ userId: req.user._id });
    res.json({ watchlist: items });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addToWatchlist = async (req, res) => {
  try {
    const { symbol } = req.body;
    const exists = await WatchlistItem.findOne({ userId: req.user._id, symbol });
    if (exists) return res.status(400).json({ message: 'Already in watchlist' });
    const item = await WatchlistItem.create({ userId: req.user._id, symbol });
    res.status(201).json({ watchlist: item });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeFromWatchlist = async (req, res) => {
  try {
    await WatchlistItem.findOneAndDelete({ userId: req.user._id, symbol: req.params.symbol.toUpperCase() });
    res.json({ message: 'Removed from watchlist' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
