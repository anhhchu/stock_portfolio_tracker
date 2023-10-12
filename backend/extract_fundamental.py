from extract_data import ExtractData 
import requests
from pymongo import MongoClient
from dotenv import load_dotenv
import os
import pandas as pd

load_dotenv()

API_KEY = os.getenv('API_KEY')
MONGO_URL = os.getenv('MONGO_URL')
client = MongoClient(MONGO_URL)

def get_symbols(db_name, collection_name, key='Symbol'):
    """
    Get all symbols in the collection
    """
    db = client[db_name]
    collection = db[collection_name]
    # Find all documents in the collection and get the 'Symbol' field
    symbols = [doc[key] for doc in collection.find({})]
    return symbols

fundamentals = ExtractData(API_KEY, client, 'test', 'fundamentals')

symbols = get_symbols('test', 'companies')
completed = get_symbols('test', 'fundamentals', 'symbol')

incompleted = set(symbols) - set(completed)
print(len(incompleted))