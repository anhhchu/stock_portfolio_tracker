import Quote from "../models/Quote.js";
import Portfolio from "../models/Portfolio.js";
import Transaction from "../models/Transaction.js";

/* Save Transaction */

export const savePortfolio = async (req, res) => {
    // lookup current Portfolio if exists or create a new Portfolio if not

    let portfolioItem = await Portfolio.findOne({ userId: req.params.userId, symbol: req.body.symbol });
    
    if (!portfolioItem || portfolioItem === null) {
        portfolioItem = new Portfolio({ userId: req.params.userId, symbol: req.body.symbol, price: null, totalQuantity:0, totalValue: 0, totalCostBasic:0, totalGainLoss: 0, averagePercentGainLoss: 0, transactions: [] });
    }

    console.log('portfolio item', portfolioItem)

    const newTransactionItem = {
        userId: req.params.userId,
        ...req.body
    };

    console.log("new Transaction", newTransactionItem)
    // const newTransactionItem = await newTransactionItem.save();

    // trigger backend process
    const symbol = req.body.symbol;
    //console.log(symbol)

    // Get stock price from Quote database
    const quote = await Quote.find({ symbol: symbol }, {'_id': 1, 'price': 1 });
    console.log(quote)
    const stockPrice = quote[0].price
    console.log('stockprice', stockPrice)

    // Calculate Cost Basic and Return for each Transaction
    const quantity = parseFloat(req.body.quantity);
    const costPerShare = parseFloat(req.body.costPerShare);
    const costBasic = (quantity * costPerShare);
    const totalValue = (stockPrice * quantity);
    const totalGainLoss = (totalValue - costBasic);
    const percentGainLoss = costBasic > 0 ? ((totalGainLoss / costBasic) * 100) : 0;

    // Calculate Cost Basic and Return for the Transaction
    newTransactionItem.price = stockPrice;
    newTransactionItem.costBasic = parseFloat(costBasic);
    newTransactionItem.totalValue = parseFloat(totalValue);
    newTransactionItem.totalGainLoss = parseFloat(totalGainLoss);
    newTransactionItem.percentGainLoss = parseFloat(percentGainLoss);


    // Calculate Cost Basic and Return for the Portfolio
    portfolioItem.price = stockPrice;
    portfolioItem.totalQuantity = parseFloat(portfolioItem.totalQuantity) + quantity;
    portfolioItem.totalCostBasic += costBasic;
    portfolioItem.totalValue += totalValue;
    portfolioItem.totalGainLoss += totalGainLoss;
    portfolioItem.averagePercentGainLoss = portfolioItem.totalCostBasic > 0 ? ((portfolioItem.totalGainLoss / portfolioItem.totalCostBasic) * 100) : 0;


    // Add the transaction to the portfolio's transactions array
    portfolioItem.transaction.push(newTransactionItem);
    const updatedPortfolioItem = await portfolioItem.save();

    res.status(201).json(updatedPortfolioItem);
}