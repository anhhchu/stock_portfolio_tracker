import Quote from "../models/Quote.js";
import Portfolio from "../models/Portfolio.js";
import Transaction from "../models/Transaction.js";

/* Save Portfolio */

export const calculateTransaction = (quantity, costPerShare, stockPrice) => {
    const costBasic = (quantity * costPerShare);
    const totalValue = (stockPrice * quantity);
    const totalGainLoss = (totalValue - costBasic);
    const percentGainLoss = costBasic > 0 ? ((totalGainLoss / costBasic) * 100) : 0;

    return {
        price: stockPrice,
        costBasic: parseFloat(costBasic),
        totalValue: parseFloat(totalValue),
        totalGainLoss: parseFloat(totalGainLoss),
        percentGainLoss: parseFloat(percentGainLoss)
    };
}

export const calculatePortfolio = (portfolioItem, quantity, costBasic, totalValue, totalGainLoss, stockPrice) => {
    portfolioItem.price = stockPrice;
    portfolioItem.totalQuantity = parseFloat(portfolioItem.totalQuantity) + quantity;
    portfolioItem.totalCostBasic += costBasic;
    portfolioItem.totalValue += totalValue;
    portfolioItem.totalGainLoss += totalGainLoss;
    portfolioItem.averagePercentGainLoss = portfolioItem.totalCostBasic > 0 ? parseFloat(((portfolioItem.totalGainLoss / portfolioItem.totalCostBasic) * 100).toFixed(4)) : 0;

    return portfolioItem;
}

export const savePortfolio = async (req, res) => {
    // lookup current Portfolio if exists or create a new Portfolio if not
    let portfolioItem = await Portfolio.findOne({ userId: req.params.userId, symbol: req.body.symbol });
    
    if (!portfolioItem || portfolioItem === null) {
        portfolioItem = new Portfolio({ userId: req.params.userId, symbol: req.body.symbol, price: null, totalQuantity:0, totalValue: 0, totalCostBasic:0, totalGainLoss: 0, averagePercentGainLoss: 0, transactions: [] });
    }


    const newTransactionItem = {
        userId: req.params.userId,
        ...req.body
    };

    // trigger backend process
    const symbol = req.body.symbol;

    // Get stock price from Quote database
    const quote = await Quote.find({ symbol: symbol }, {'_id': 1, 'price': 1 });
    const stockPrice = quote[0].price

    // Calculate Cost Basic and Return for each Transaction
    const quantity = parseFloat(req.body.quantity);
    const costPerShare = parseFloat(req.body.costPerShare);

    Object.assign(newTransactionItem, calculateTransaction(quantity, costPerShare, stockPrice));

    // Calculate Cost Basic and Return for the Portfolio
    Object.assign(portfolioItem, calculatePortfolio(portfolioItem, quantity, newTransactionItem.costBasic, newTransactionItem.totalValue, newTransactionItem.totalGainLoss, stockPrice));

    // Add the transaction to the portfolio's transactions array
    portfolioItem.transaction.push(newTransactionItem);
    
    const updatedPortfolioItem = await portfolioItem.save();

    res.status(201).json(updatedPortfolioItem);
}
