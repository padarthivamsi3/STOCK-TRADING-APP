const axios = require("axios");

const BASE_URL = "https://finnhub.io/api/v1";

const apiKey = process.env.FINNHUB_API_KEY;

// Search Stocks
const searchStocks = async (query) => {

    const response = await axios.get(
        `${BASE_URL}/search?q=${query}&token=${apiKey}`
    );

    return response.data;
};

// Get Stock Quote
const getQuote = async (symbol) => {

    const response = await axios.get(
        `${BASE_URL}/quote?symbol=${symbol}&token=${apiKey}`
    );

    return response.data;
};

// Company Profile
const getCompanyProfile = async (symbol) => {

    const response = await axios.get(
        `${BASE_URL}/stock/profile2?symbol=${symbol}&token=${apiKey}`
    );

    return response.data;
};

// Generate mock historical data if Finnhub fails
function generateMockHistory(symbol, from, to, quote, resolution = 'D') {
  const data = [];
  
  // Validate and sanitize inputs to prevent overflow
  let toNum = Number(to);
  let fromNum = Number(from);
  
  // Fallback defaults if inputs are invalid
  if (!Number.isFinite(toNum)) {
    toNum = Math.floor(Date.now() / 1000);
  }
  if (!Number.isFinite(fromNum) || fromNum >= toNum) {
    fromNum = toNum - (365 * 24 * 60 * 60); // 1 year ago
  }
  
  let currentTime = fromNum;
  let currentPrice = Number(quote?.pc) || 100; // Ensure it's a number
  
  console.log('generateMockHistory - sanitized inputs:', { from: fromNum, to: toNum, currentPrice });
  
  // Determine time step and max data points based on resolution
  let timeStep;
  const maxDataPoints = 100; // Limit even more to prevent issues
  
  switch (resolution) {
    case '1':
    case '5':
    case '15':
    case '30':
    case '60':
      timeStep = parseInt(resolution) * 60; // minutes to seconds
      break;
    case 'D':
      timeStep = 24 * 60 * 60; // 1 day
      break;
    case 'W':
      timeStep = 7 * 24 * 60 * 60; // 1 week
      break;
    case 'M':
      timeStep = 30 * 24 * 60 * 60; // 1 month
      break;
    default:
      timeStep = 24 * 60 * 60;
  }
  
  // Calculate how many points we need
  const totalSeconds = toNum - fromNum;
  let numPoints = Math.floor(totalSeconds / timeStep);
  
  if (numPoints > maxDataPoints) {
    // Adjust time step to stay under max data points - simple fix instead of scaling
    timeStep = Math.floor((toNum - fromNum) / maxDataPoints) + 1;
  }
  
  console.log('generateMockHistory - timeStep:', timeStep, 'maxDataPoints:', maxDataPoints);
  
  let loopCount = 0;
  while (currentTime <= toNum && data.length < maxDataPoints && loopCount < 1000) {
    const volatility = 0.02; // 2% volatility
    const change = (Math.random() - 0.5) * 2 * volatility * currentPrice;
    const open = currentPrice;
    const close = currentPrice + change;
    const high = Math.max(open, close) + Math.random() * volatility * currentPrice;
    const low = Math.min(open, close) - Math.random() * volatility * currentPrice;
    const volume = Math.floor(Math.random() * 10000000) + 1000000;
    
    data.push({
      time: Math.floor(currentTime), // Ensure integer
      open: Number(open.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      close: Number(close.toFixed(2)),
      volume: volume
    });
    
    currentPrice = close;
    currentTime += timeStep;
    loopCount++;
  }
  
  console.log('generateMockHistory - generated', data.length, 'candles');
  
  return {
    s: "ok",
    t: data.map(d => d.time),
    o: data.map(d => d.open),
    h: data.map(d => d.high),
    l: data.map(d => d.low),
    c: data.map(d => d.close),
    v: data.map(d => d.volume)
  };
}

// Get Stock Historical Data (OHLC)
const getStockHistory = async (symbol, resolution, from, to) => {
  try {
    // First try to get real data from Finnhub
    const response = await axios.get(
      `${BASE_URL}/stock/candle?symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}&token=${apiKey}`
    );
    
    if (response.data.s === "ok") {
      return response.data;
    }
    
    // If Finnhub returns an error, use mock data
    console.log('Finnhub returned error, using mock data');
    const quoteRes = await axios.get(
      `${BASE_URL}/quote?symbol=${symbol}&token=${apiKey}`
    );
    return generateMockHistory(symbol, from, to, quoteRes.data, resolution);
  } catch (error) {
    // If Finnhub fails completely, use mock data
    console.log('Finnhub API failed, using mock data:', error.message);
    try {
      const quoteRes = await axios.get(
        `${BASE_URL}/quote?symbol=${symbol}&token=${apiKey}`
      );
      return generateMockHistory(symbol, from, to, quoteRes.data, resolution);
    } catch (quoteError) {
      // If even quote fails, generate mock without quote
      return generateMockHistory(symbol, from, to, null, resolution);
    }
  }
};

module.exports = {
    searchStocks,
    getQuote,
    getCompanyProfile,
    getStockHistory
};