import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 6 },
  virtualBalance: { type: Number, default: 100000 },
  portfolio: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PortfolioItem' }],
  watchlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'WatchlistItem' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema);
