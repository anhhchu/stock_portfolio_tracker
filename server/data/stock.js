export const transactions = [
    {
        "_id": "63bf8239f03239e002001812",
        "userId": "2",
        "symbol":"AAPL",
        "date": "2023-01-01",
        "quantity": 10,
        "costPerShare": 100.00,
        "costBasic": 1000.00,
        "price" : 120.00,
        "totalValue": 120.00,
        "totalGainLoss": 200.00,
        "percentGainLoss": 20.00
    },
    {
        "_id": "63bf7ac9f03239e002001605",
        "userId": "2",
        "symbol":"AAPL",
        "date": "2023-02-01",
        "quantity": 10,
        "costPerShare": 100.00,
        "costBasic": 1000.00,
        "price" : 120.00,
        "totalValue": 1200,
        "totalGainLoss": 200,
        "percentGainLoss": -16.67
    },
    {
        "_id": "63bf7ac9f03239e002001607",
        "userId": "2",
        "symbol":"TSLA",
        "date": "2023-02-01",
        "quantity": 10,
        "costPerShare": 100.00,
        "costBasic": 1000.00,
        "price" : 120.00,
        "totalValue": 1200,
        "totalGainLoss": 200,
        "percentGainLoss": -16.67
    }
]

//  https://financialmodelingprep.com/api/v3/quote/AAPL,FB
export const quotes = [
    {
        "_id": "64eb9b41fe9b808423d12e52",
        "symbol":"AAPL",       
        "priceAvg50" : 149.04265000,
        "priceAvg200" : 134.71935000,
        "yearHigh" : 157.26000000,
        "yearLow" : 103.10000000,
        "eps" : 5.10800000,
        "pe" : 29.27760500,
        "volume" : 97750498
    },
    {
        "_id": "63bf7ac9f03239e002001603",
        "symbol":"TSLA",        
        "priceAvg50" : 149.04265000,
        "priceAvg200" : 134.71935000,
        "yearHigh" : 157.26000000,
        "yearLow" : 103.10000000,
        "eps" : 5.10800000,
        "pe" : 29.27760500,
        "volume" : 97750498
    },
    {
        "_id": "64eb9b41fe9b808423d12e53",
        "symbol":"MSFT",        
        "priceAvg50" : 149.04265000,
        "priceAvg200" : 134.71935000,
        "yearHigh" : 157.26000000,
        "yearLow" : 103.10000000,
        "eps" : 5.10800000,
        "pe" : 29.27760500,
        "volume" : 97750498
    }
]

export const performances = [
    {
        "_id": "63bf7ac9f03239e002001604",
        "symbol" : "AAPL",
        "1D" : -1.92,
        "5D" : -3.86,
        "1M" : -11.55,
        "3M" : -10.6,
        "6M" : -11.34,
        "ytd" : -21.37,
        "1Y" : 14.1,
        "3Y" : 218.62,
        "5Y" : 272.2,
        "10Y" : 602.31,
        "max" : 111401.54
    },
    {
        "_id": "63bf7ccef03239855d00155d",
        "symbol" : "TSLA",
        "1D" : -1.92,
        "5D" : -3.86,
        "1M" : -11.55,
        "3M" : -10.6,
        "6M" : -11.34,
        "ytd" : -21.37,
        "1Y" : 14.1,
        "3Y" : 218.62,
        "5Y" : 272.2,
        "10Y" : 602.31,
        "max" : 111401.54
    },
    {
        "_id": "63bf7ac9f03239e002001605",
        "symbol" : "MSFT",
        "1D" : -1.92,
        "5D" : -3.86,
        "1M" : -11.55,
        "3M" : -10.6,
        "6M" : -11.34,
        "ytd" : -21.37,
        "1Y" : 14.1,
        "3Y" : 218.62,
        "5Y" : 272.2,
        "10Y" : 602.31,
        "max" : 111401.54
    }
]

// https://financialmodelingprep.com/api/v4/score?symbol=AAPL&apikey=YOUR_API_KEY
export const fundamentals = [
    {
        "_id": "63bf7ccef03239eb9d0016d9",
        "symbol" : "AAPL",
        "name": "Apple Inc.",
        "altmanZScore" : 7.676470211047106,
        "piotroskiScore" : 7.0,
        "workingCapital" : 9355000000,
        "totalAssets" : 351002000000,
        "retainedEarnings" : 5562000000,
        "ebit" : 111852000000,
        "marketCap" : 2652869754880,
        "totalLiabilities" : 287912000000,
        "revenue" : 365817000000
    },
    {
        "_id": "63bf7ccef032396a8e001696",
        "symbol" : "TSLA",
        "name": "Tesla Inc.",
        "altmanZScore" : 7.676470211047106,
        "piotroskiScore" : 7.0,
        "workingCapital" : 9355000000,
        "totalAssets" : 351002000000,
        "retainedEarnings" : 5562000000,
        "ebit" : 111852000000,
        "marketCap" : 2652869754880,
        "totalLiabilities" : 287912000000,
        "revenue" : 365817000000
    },
    {
        "_id": "63bf7ccef03239cf1b0016a7",
        "symbol" : "MSFT",
        "name": "Microsoft Inc.",
        "altmanZScore" : 7.676470211047106,
        "piotroskiScore" : 7.0,
        "workingCapital" : 9355000000,
        "totalAssets" : 351002000000,
        "retainedEarnings" : 5562000000,
        "ebit" : 111852000000,
        "marketCap" : 2652869754880,
        "totalLiabilities" : 287912000000,
        "revenue" : 365817000000
    }
]