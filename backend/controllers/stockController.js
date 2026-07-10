import axios from 'axios';

const API_KEY = process.env.ALPHA_VANTAGE_API_KEY || 'demo';
const BASE_URL = 'https://www.alphavantage.co/query';

const sampleStocks = [
  { symbol: 'AAPL', companyName: 'Apple Inc.', price: 198.43, change: 1.42, volume: 58600000, marketCap: 3040000000000, high52: 199.62, low52: 164.08, open: 195.1, close: 195.3, previousClose: 195.3 },
  { symbol: 'MSFT', companyName: 'Microsoft Corp.', price: 425.8, change: -0.41, volume: 21400000, marketCap: 3150000000000, high52: 468.35, low52: 376.91, open: 427.1, close: 426.9, previousClose: 427.2 },
  { symbol: 'NVDA', companyName: 'NVIDIA Corp.', price: 124.72, change: 2.89, volume: 47600000, marketCap: 3060000000000, high52: 140.76, low52: 39.23, open: 121.4, close: 121.2, previousClose: 121.2 },
  { symbol: 'TSLA', companyName: 'Tesla Inc.', price: 248.17, change: -1.15, volume: 33400000, marketCap: 793000000000, high52: 299.29, low52: 138.8, open: 250.6, close: 250.2, previousClose: 250.2 },
  { symbol: 'AMZN', companyName: 'Amazon.com Inc.', price: 188.29, change: 0.72, volume: 28700000, marketCap: 1970000000000, high52: 201.20, low52: 118.35, open: 187.3, close: 187.9, previousClose: 187.9 },
  { symbol: 'GOOGL', companyName: 'Alphabet Inc.', price: 177.05, change: 0.99, volume: 19800000, marketCap: 2180000000000, high52: 191.75, low52: 129.40, open: 175.5, close: 176.0, previousClose: 176.0 }
];

const parseNumber = (value) => {
  if (value === null || value === undefined || value === '') return 0;
  const parsed = Number(String(value).replace(/[%,$]/g, ''));
  return Number.isFinite(parsed) ? parsed : 0;
};

const buildFallbackStock = (symbol) => {
  const normalized = symbol.toUpperCase();
  const basePrice = 95 + normalized.length * 6.5;
  const change = ((normalized.charCodeAt(0) % 7) - 3) * 0.42;
  return {
    symbol: normalized,
    companyName: `${normalized} Corporation`,
    price: Number(basePrice.toFixed(2)),
    change: Number(change.toFixed(2)),
    volume: 'N/A',
    marketCap: null,
    high52: null,
    low52: null,
    open: null,
    close: null,
    previousClose: null
  };
};

const normalizeStocks = (stocks = []) =>
  stocks.map((stock) => ({
    symbol: stock.ticker || stock.symbol || stock['1. symbol'] || '',
    companyName: stock.companyName || stock.name || stock['2. name'] || 'Unknown Company',
    price: parseNumber(stock.price || stock['4. close'] || stock['price']),
    change: parseNumber(stock.change_percentage || stock.change || stock.change_pct || stock['change_percentage']),
    volume: stock.volume || stock['6. volume'] || 'N/A',
    marketCap: stock.marketCap || stock.market_cap || null,
    high52: stock.high52 || stock['52_week_high'] || null,
    low52: stock.low52 || stock['52_week_low'] || null,
    open: stock.open || stock['1. open'] || null,
    close: stock.close || stock['4. close'] || null,
    previousClose: stock.previousClose || stock['5. previous close'] || null
  }));

export const getStocks = async (_req, res) => {
  try {
    const response = await axios.get(BASE_URL, { params: { function: 'TOP_GAINERS_LOSERS', apikey: API_KEY } });
    const remoteStocks = response.data?.top_gainers;
    if (Array.isArray(remoteStocks) && remoteStocks.length > 0) {
      return res.json({ stocks: normalizeStocks(remoteStocks.slice(0, 6)) });
    }
    res.json({ stocks: sampleStocks });
  } catch (error) {
    res.json({ stocks: sampleStocks });
  }
};

export const getStockBySymbol = async (req, res) => {
  const symbol = req.params.symbol.toUpperCase();
  const stock = sampleStocks.find((item) => item.symbol === symbol) || buildFallbackStock(symbol);
  res.json({ stock });
};

export const searchStocks = async (req, res) => {
  const query = req.query.q?.toUpperCase() || '';
  const filtered = sampleStocks.filter((stock) => stock.symbol.includes(query) || stock.companyName.toUpperCase().includes(query));
  res.json({ stocks: filtered });
};
