import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  symbol: { type: String, required: true, uppercase: true },
  buyOrSell: { type: String, enum: ['buy', 'sell'], required: true },
  price: { type: Number, required: true, min: 0 },
  quantity: { type: Number, required: true, min: 1 },
  date: { type: Date, default: Date.now }
});

export default mongoose.model('Transaction', transactionSchema);
