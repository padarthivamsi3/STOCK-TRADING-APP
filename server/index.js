const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const userRoute = require("./routes/userRoute");
const stockRoute = require("./routes/stockRoute");
const orderRoute = require("./routes/orderRoute");
const transactionRoute = require("./routes/transactionRoute");

dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Test Route
app.get("/", (req, res) => {
  res.send("🚀 StockForge API is running...");
});

// Routes
app.use("/api/users", userRoute);
app.use("/api/stocks", stockRoute);
app.use("/api/orders", orderRoute);
app.use("/api/transactions", transactionRoute);

const PORT = process.env.PORT || 8060;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});