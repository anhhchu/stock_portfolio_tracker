import requests
from pymongo import MongoClient
from dotenv import load_dotenv
import os
import pandas as pd

load_dotenv()

API_KEY = os.getenv('API_KEY')
MONGO_URL = os.getenv('MONGO_URL')
client = MongoClient(MONGO_URL)


def convert_csv_to_dict(csv_file_path):
    # Read CSV data into a DataFrame
    df = pd.read_csv(csv_file_path)

    # Filter the DataFrame to keep only records with Country == "United States" and non-empty IPO Year
    df_filtered = df[(df["Country"] == "United States") & (
        df["IPO Year"].notna()) & (df["IPO Year"] != "")]

    # Convert DataFrame to a list of dictionaries (each row becomes a dictionary)
    data = df.to_dict(orient="records")
    return data


def insert_documents(db_name, collection_name, data, overwrite=False):
    """
    Insert documents to mongodb database
    * db_name
    * collection_name
    * data dictionary
    * if overwrite is True, delete all documents from the collection before inserting
    """
    db = client[db_name]
    # Create the collection if it doesn't exist
    if collection_name not in db.list_collection_names():
        db.create_collection(collection_name)

    collection = db[collection_name]

    if overwrite:
        # Delete all documents from the collection
        collection.delete_many({})

    # Insert data into MongoDB
    try:
        collection.insert_many(data)
        print(f"{len(data)} documents inserted into MongoDB")
    except Exception as e:
        print("Fail to insert data")
        print(e)


def delete_documents(db_name, collection_name):
    db = client[db_name]
    collection = db[collection_name]
    # Delete all documents in the collection
    collection.delete_many({})


def upsert_documents(db_name, collection_name, symbols_data):
    db = client[db_name]
    collection = db[collection_name]

    for data in symbols_data:
        symbol = data.pop("symbol")
        result = collection.update_one(
            {"symbol": symbol},  # condition
            {"$set": data},  # update
            upsert=True  # if not found, insert
        )


def extract_quote(symbols):
    url = f"https://financialmodelingprep.com/api/v3/quote/{symbols}?apikey={API_KEY}"
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for HTTP errors (4xx and 5xx)
        data = response.json()
        upsert_documents("test", "quotes", data)
        print(f"Data retrieved and inserted successfully: {symbols}")
    except requests.exceptions.RequestException as e:
        print(f"Request error: {e}")
    except requests.exceptions.HTTPError as e:
        print(f"HTTP error: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


def extract_performance(symbols):
    url = f"https://financialmodelingprep.com/api/v3/stock-price-change/{symbols}?apikey={API_KEY}"
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for HTTP errors (4xx and 5xx)
        data = response.json()
        upsert_documents("test", "performances", data)
        print(f"Data retrieved and inserted successfully: {symbols}")
    except requests.exceptions.RequestException as e:
        print(f"Request error: {e}")
    except requests.exceptions.HTTPError as e:
        print(f"HTTP error: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


def extract_fundamental(symbol):
    url = f"https://financialmodelingprep.com/api/v3/ratios/{symbol}?apikey={API_KEY}"
    url2 = f"https://financialmodelingprep.com/api/v3/rating/{symbol}?limit=1&apikey={API_KEY}"
    url3 = f"https://financialmodelingprep.com/api/v3/enterprise-values/{symbol}?limit=1&apikey={API_KEY}"
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for HTTP errors (4xx and 5xx)
        data = response.json()[0]

        response2 = requests.get(url2)
        response2.raise_for_status()  # Raise an exception for HTTP errors (4xx and 5xx)
        data2 = response2.json()[0]

        response3 = requests.get(url3)
        data3 = response3.json()[0]

        if data3.get('enterpriseValue') and data3.get('numberOfShares'):
            fairValue = round(data3.get('enterpriseValue') /
                              data3.get('numberOfShares'), 2)
        else:
            fairValue = ""

        json_data = [{
            'symbol': symbol,
            'grossProfitMargin': round(data.get('grossProfitMargin'), 4),
            'operatingProfitMargin': round(data.get('operatingProfitMargin'), 4),
            'netProfitMargin': round(data.get('netProfitMargin'), 4),
            'debtRatio': round(data.get('debtRatio'), 4),
            'cashFlowToDebtRatio': round(data.get('cashFlowToDebtRatio'), 4),
            'priceToBookRatio': round(data.get('priceToBookRatio'), 4),
            'priceEarningsRatio': round(data.get('priceEarningsRatio'), 4),
            'priceEarningsToGrowthRatio': round(data.get('priceEarningsToGrowthRatio'), 4),
            'dividendYield': data.get('dividendYield'),
            'ratingScore': data2.get('ratingScore'),
            'ratingRecommendation': data2.get('ratingRecommendation'),
            'marketCapitalization': data3.get('marketCapitalization'),
            'enterpriseValue': data3.get('enterpriseValue'),
            'fairValue': fairValue
        }]

        upsert_documents("test", "fundamentals", json_data)
        print(f"Data retrieved and inserted successfully: {symbol}")
    except requests.exceptions.RequestException as e:
        print(f"Request error: {e}")
    except requests.exceptions.HTTPError as e:
        print(f"HTTP error: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


def get_symbols(db_name, collection_name, key='Symbol'):
    # Find all documents in the collection and get the 'Symbol' field
    db = client[db_name]
    collection = db[collection_name]
    symbols = [doc[key] for doc in collection.find({})]

    return symbols


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


if __name__ == "__main__":
    # symbols = get_symbols('test', 'companies')

    # ### GET FUNDAMENTALS
    # completed = get_symbols('test', 'fundamentals', 'symbol')
    # incompleted = set(symbols) - set(completed)
    # print(len(incompleted))

    # for symbol in incompleted:
    #     extract_fundamental(symbol)

    # GET PERFORMANCE
    # for i in range(0, len(symbols), 20):
    #     keys = ",".join(s for s in symbols[i:i+20])
    #     # print(keys)
    #     try:
    #         extract_performance(keys)
    #     except Exception as e:
    #         print(f"Error requesting data: {keys}")

    # completed = extract_symbols('test', 'performances', 'symbol')
    # print(len(completed))

    # GET QUOTES
    # for i in range(0, len(symbols), 100):
    #     keys = ",".join(s for s in symbols[i:i+100])
    #     # print(keys)
    #     try:
    #         extract_quote(keys)
    #     except Exception as e:
    #         print(f"Error requesting data: {keys}")

    # completed = extract_symbols('test', 'quotes', 'symbol')
    # print(len(completed))

    create_portfolios('test', False)
