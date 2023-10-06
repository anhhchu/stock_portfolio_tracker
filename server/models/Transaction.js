import mongoose from "mongoose";


const Schema = mongoose.Schema;


export const transactionSchema = new Schema(
    {
        userId: String,
        symbol: String,
        date: String,
        quantity: Number,
        costPerShare: Number,
        costBasic: Number,
        price: Number,
        totalValue: Number,
        totalGainLoss: Number,
        percentGainLoss: Number
    },
    { toJSON: { getters: true }}
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;