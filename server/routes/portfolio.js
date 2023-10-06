import express from "express";
import Portfolio from "../models/Portfolio.js";
import { verifyToken } from "../middleware/verifyToken.js";
import axios from 'axios';
import mongodb from 'mongodb';
const { ObjectId } = mongodb;
import { savePortfolio } from "../controllers/portfolio.js";

const router = express.Router();
const API_KEY = process.env.API_KEY;

router.get("/portfolio/:userId", verifyToken, async(req, res) => {
    try {
        if (!req.params.userId) {
            res.status(400).json({message: "Missing required query parameter: userId"});
            return;
        }
        const query = {userId: req.params.userId};
        const portfolio = await Portfolio.find(query);
        res.status(200).json(portfolio)
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});

router.post("/portfolio/:userId", verifyToken, async(req, res) => {
    try {
        if (!req.params.userId) {
            res.status(400).json({message: "Missing required query parameter: userId"});
            return;
        }
        console.log("Save portfolio")
        await savePortfolio(req, res)
    } catch (error) {
        res.status(500).json({message: error.message});
    };
});


// router.delete("/portfolio/:userId", verifyToken, async(req, res) => {
//     try {
//         if (!req.params.userId) {
//             res.status(400).json({message: "Missing required query parameter: userId"});
//             return;
//         }
//         const ids = req.body.ids.map(id => new ObjectId(id)); // Convert string ids to ObjectIds
//         //console.log(ids)
//         const query = { userId: req.params.userId, _id: { $in: ids } };
//         const result = await Transaction.deleteMany(query);
//         res.status(200).json({ message: `Successfully deleted ${result.deletedCount} records.` });
//     } catch (error) {
//         res.status(500).json({message: error.message});
//     }
// });

export default router;