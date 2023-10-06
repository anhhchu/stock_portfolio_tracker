import express from "express";
import Performance from "../models/Performance.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();
router.get("/performance", verifyToken, async(req, res) => {
    try {
        if (!req.query.symbols) {
            res.status(200).json([]);
            return;
        }
        const query = {symbol: { $in: req.query.symbols.split(",") }};
        const performance = await Performance.find(query);
        res.status(200).json(performance)
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});


export default router;