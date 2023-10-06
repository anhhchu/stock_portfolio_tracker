import mongoose from "mongoose";
import {transactionSchema} from "./Transaction.js";


const Schema = mongoose.Schema;


const portfolioSchema = new Schema(
    {
        "userId": String,
        "symbol": String,
        "price": Number,
        "totalQuantity": Number,
        "totalCostBasic": Number,
        "totalValue": Number,
        "totalGainLoss": Number,
        "averagePercentGainLoss": Number,
        "transaction": [transactionSchema]
    },
    { toJSON: { getters: true }}
);

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

export default Portfolio;