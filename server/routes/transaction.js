import express from "express";
import Transaction from "../models/Transaction.js";
import { verifyToken } from "../middleware/verifyToken.js";
import axios from 'axios';
import mongodb from 'mongodb';
import { savePortfolio } from "../controllers/portfolio.js";
const { ObjectId } = mongodb;


const router = express.Router();
const API_KEY = process.env.API_KEY;

router.get("/transaction/:userId/", verifyToken, async(req, res) => {
    try {
        // if (!req.params.userId || !req.params.symbol) {
        //     res.status(400).json({message: "Missing required query parameters: userId or symbol"});
        //     return;
        // }
        if (!req.params.userId ) {
            res.status(400).json({message: "Missing required query parameters: userId "});
            return;
        }
        const query = {userId: req.params.userId};
        const transaction = await Transaction.find(query).sort({date: -1});
        res.status(200).json(transaction)
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});


router.post("/transaction/:userId", verifyToken, async(req, res) => {
    try {
        if (!req.params.userId) {
            res.status(400).json({message: "Missing required query parameter: userId"});
            return;
        }
        await saveTransaction(req, res)
    } catch (error) {
        res.status(500).json({message: error.message});
    };
});


router.delete("/transaction/:userId", verifyToken, async(req, res) => {
    try {
        if (!req.params.userId) {
            res.status(400).json({message: "Missing required query parameter: userId"});
            return;
        }
        const ids = req.body.ids.map(id => new ObjectId(id)); // Convert string ids to ObjectIds
        //console.log(ids)
        const query = { userId: req.params.userId, _id: { $in: ids } };
        const result = await Transaction.deleteMany(query);
        res.status(200).json({ message: `Successfully deleted ${result.deletedCount} records.` });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

export default router;