def create_portfolios(db_name, overwrite=True):
    db = client[db_name]
    transactions = db['transactions']

    if "portfolios" not in db.list_collection_names():
        db.create_collection("portfolios")

    if overwrite:
        delete_documents('test', 'portfolios')

    portfolios = db['portfolios']

    # Aggregate transactions
    pipeline = [
        {
            "$group": {
                "_id": {"userId": "$userId", "symbol": "$symbol"},
                "totalQuantity": {"$sum": "$quantity"},
                "totalCostBasic": {"$sum": "$costBasic"},
                "totalValue": {"$sum": "$totalValue"},
                "totalGainLoss": {"$sum": "$totalGainLoss"}
            }
        },
        {
            "$project": {
                "_id": 0,
                "userId": "$_id.userId",
                "symbol": "$_id.symbol",
                "totalQuantity": 1,
                "totalCostBasic": 1,
                "totalValue": 1,
                "totalGainLoss": 1,
                "averagePercentGainLoss": {
                    "$round": [
                        {
                            "$multiply": [
                                {"$divide": ["$totalGainLoss",
                                             "$totalCostBasic"]},
                                100
                            ]
                        }, 2
                    ]
                }

            }
        }
    ]

    # Run aggregation
    result = transactions.aggregate(pipeline)

    data = []

    for doc in result:
        tranx = list(transactions.find(
            {"userId": doc["userId"], "symbol": doc["symbol"]}))
        doc["transaction"] = tranx
        data.append(doc)

    portfolios.insert_many(data)
    print(f"{len(data)} documents inserted into MongoDB")

