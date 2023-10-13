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


def add_weight(db_name):
    db = client[db_name]

    portfolios = db['portfolios']

    docs = portfolios.find({})
    
    


