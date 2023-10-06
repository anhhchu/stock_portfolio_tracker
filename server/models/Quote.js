import mongoose from "mongoose";


const Schema = mongoose.Schema;


const quoteSchema = new Schema(
    {
        "symbol": String,
        "avgVolume": Number,
        "change": Number,
        "changesPercentage": Number,
        "dayHigh": Number,
        "dayLow": Number,
        "earningsAnnouncement": String,
        "eps": Number,
        "exchange": String,
        "marketCap": String,
        "name": String,
        "open": Number,
        "pe": Number,
        "previousClose": Number,
        "price": Number,
        "priceAvg200": Number,
        "priceAvg50": Number,
        "sharesOutstanding": Number,
        "timestamp": Number,
        "volume": Number,
        "yearHigh": Number,
        "yearLow": Number,
    },
    { toJSON: { getters: true }}
);

const Quote = mongoose.model("Quote", quoteSchema);

export default Quote;