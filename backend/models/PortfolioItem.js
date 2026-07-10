import mongoose from 'mongoose';

const portfolioItemSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  symbol: { type: String, required: true, uppercase: true },
  companyName: { type: String, required: true },
  quantity: { type: Number, required: true, min: 0 },
  averagePrice: { type: Number, required: true, min: 0 },
  currentPrice: { type: Number, default: 0 },
  profitLoss: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('PortfolioItem', portfolioItemSchema);
