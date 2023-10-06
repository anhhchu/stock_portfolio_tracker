import express from "express";
import Fundamental from "../models/Fundamental.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/fundamental", verifyToken, async(req, res) => {
    try {
        if (!req.query.symbols) {
            res.status(200).json([]);
            return;
        }
        const query = {symbol: { $in: req.query.symbols.split(",") }};
        const fundamental = await Fundamental.find(query);
        res.status(200).json(fundamental)
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});


export default router;