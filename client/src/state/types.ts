export interface GetTransactionResponse {
    "_id": string,
    "userId": string,
    "symbol": string,
    "date": string,
    "quantity": number,
    "costPerShare": number,
    "costBasic": number,
    "price": number,
    "totalValue": number,
    "totalGainLoss": number,
    "percentGainLoss": number,
    "__v": number,
    "id": string
}

export interface Transaction {
    "userId": string,
    "symbol": string,
    "date": string,
    "quantity": number,
    "costPerShare": number,
    "costBasic": number,
    "price": number,
    "totalValue": number,
    "totalGainLoss": number,
    "percentGainLoss": number,
    "id": string
}


export interface GetPortfolioResponse {
    "_id": string,
    "userId": String,
    "symbol": String,
    "price": Number,
    "totalQuantity": Number,
    "totalCostBasic": Number,
    "totalValue": Number,
    "totalGainLoss": Number,
    "averagePercentGainLoss": Number,
    "transaction": Array<GetTransactionResponse>,
    "__v": number,
    "id": string
}

export interface GetPerformanceResponse {
    "_id": string,
    "symbol": string,
    "1D": number,
    "5D": number,
    "1M": number,
    "3M": number,
    "6M": number,
    "ytd": number,
    "1Y": number,
    "3Y": number,
    "10Y": number,
    "max": number,
    "__v": number,
    "id": string
}

export interface GetFundamentalResponse {
    "_id": string,
    "symbol": String,
    "cashFlowToDebtRatio": Number,
    "debtRatio": Number,
    "dividendYield": Number,
    "enterpriseValue": Number,
    "fairValue": Number,
    "grossProfitMargin": Number,
    "marketCapitalization": Number,
    "netProfitMargin": Number,
    "operatingProfitMargin": Number,
    "priceEarningsRatio": Number,
    "priceEarningsToGrowthRatio": Number,
    "priceToBookRatio": Number,
    "ratingRecommendation": String,
    "ratingScore": Number,
    "__v": 0,
    "id": string
}

export interface GetCompanyResponse {
    "_id": string,
    "Symbol": String,
    "Company Name": String,
    "Industry": String,
    "Sector": String,
    "__v": 0
}


export interface GetQuoteResponse {
    "_id": String,
    "symbol": String,
    "eps": Number,
    "name": String,
    "pe": Number,
    "price": Number,
    "priceAvg200": Number,
    "priceAvg50": Number,
    "id": String
}



