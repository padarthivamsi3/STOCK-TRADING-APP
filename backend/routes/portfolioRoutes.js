import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getPortfolio, buyStock, sellStock } from '../controllers/portfolioController.js';

const router = express.Router();

router.get('/', protect, getPortfolio);
router.post('/buy', protect, buyStock);
router.post('/sell', protect, sellStock);

export default router;
