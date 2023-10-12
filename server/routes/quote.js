import express from "express";
import Quote from "../models/Quote.js";

const router = express.Router();

router.get("/quote", async(req, res) => {
    try {
        if (!req.query.symbols) {
            res.status(200).json([]);
            return;
        }
        const symbol = req.query.symbols;
        const quote = await Quote.find({symbol: symbol}, {'_id': 1, 'symbol': 1, 'name': 1, 'price': 1, 'eps': 1, 'pe':1, 'priceAvg200':1, 'priceAvg50':1});
        res.status(200).json(quote)
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});


export default router;