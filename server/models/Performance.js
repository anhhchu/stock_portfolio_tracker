import mongoose from "mongoose";


const Schema = mongoose.Schema;


const performanceSchema = new Schema(
    {
        "symbol": String,
        "1D": Number,
        "5D": Number,
        "1M": Number,
        "3M": Number,
        "6M": Number,
        "ytd": Number,
        "1Y": Number,
        "3Y": Number,
        "5Y": Number,
        "10Y": Number,
        "max": Number
    },
    { toJSON: { getters: true }}
);

const Performance = mongoose.model( "Performance", performanceSchema);

export default Performance;