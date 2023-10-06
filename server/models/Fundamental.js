import mongoose from "mongoose";

const Schema = mongoose.Schema;

//https://financialmodelingprep.com/api/v4/score?symbol=AAPL&apikey=YOUR_API_KEY
const fundamentalSchema = new Schema(
  {
    "symbol": String,
    "cashFlowToDebtRatio": Number,
    "debtRatio": Number,
    "dividendYield": Number,
    "enterpriseValue": Number,
    "fairValue": Number,
    "grossProfitMargin": Number,
    "marketCapitalization": Number,
    "netProfitMargin": Number,
    "operatingProfitMargin": Number,
    "priceEarningsRatio": Number,
    "priceEarningsToGrowthRatio": Number,
    "priceToBookRatio": Number,
    "ratingRecommendation": String,
    "ratingScore": Number,
  },
  { toJSON: { getters: true } }
);

const Fundamental = mongoose.model("Fundamental", fundamentalSchema);

export default Fundamental;
