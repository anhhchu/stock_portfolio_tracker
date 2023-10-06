import express from "express";
import Company from "../models/Company.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/company", verifyToken, async(req, res) => {
    try {
        const company = await Company.find({}).sort({Symbol: 1});
        res.status(200).json(company)
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});


export default router;