import unittest
from unittest.mock import patch, MagicMock, call
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
db_name = "test"


class TestExtractData(unittest.TestCase):
    @patch('requests.get')
    @patch('extract_data.ExtractData._upsert_documents')
    def test_extract_performance(self, mock_upsert, mock_get):
        # Arrange
        symbols = 'AAPL'
        api_data = [
            {
                "_id": "65073bb8d2dcf5a2e616a483",
                "symbol": "AAPL",
                "1D": 0.3046,
                "1M": -9.63264,
                "1Y": 20.18954,
                "3M": -11.73377,
                "3Y": 46.59646,
                "5D": -1.71642,
                "5Y": 201.373,
                "6M": 3.82656,
                "10Y": 882.27194,
                "max": 133293.06584,
                "ytd": 36.89134,
                "id": "65073bb8d2dcf5a2e616a483"
            }
        ]
        mock_response = MagicMock()
        mock_response.json.return_value = api_data
        mock_get.return_value = mock_response
        # replace with your actual class
        instance = ExtractData(API_KEY, client, db_name)

        # Act
        instance.extract_performance(symbols)

        # Assert
        mock_get.assert_called_once_with(
            f"https://financialmodelingprep.com/api/v3/stock-price-change/{symbols}?apikey={API_KEY}")
        mock_upsert.assert_called_once_with("performances", api_data)

    @patch('requests.get')
    @patch('extract_data.ExtractData._upsert_documents')
    def test_extract_quote(self, mock_upsert, mock_get):
        # Arrange
        symbols = 'AAPL'
        api_data = [
            {
                "_id": "65073bb8d2dcf5a2e616a483",
                "symbol": "AAPL",
                "1D": 0.3046,
                "1M": -9.63264,
                "1Y": 20.18954,
                "3M": -11.73377,
                "3Y": 46.59646,
                "5D": -1.71642,
                "5Y": 201.373,
                "6M": 3.82656,
                "10Y": 882.27194,
                "max": 133293.06584,
                "ytd": 36.89134,
                "id": "65073bb8d2dcf5a2e616a483"
            }
        ]
        mock_response = MagicMock()
        mock_response.json.return_value = api_data
        mock_get.return_value = mock_response
        # replace with your actual class
        instance = ExtractData(API_KEY, client, db_name)

        # Act
        instance.extract_performance(symbols)

        # Assert
        mock_get.assert_called_once_with(
            f"https://financialmodelingprep.com/api/v3/stock-price-change/{symbols}?apikey={API_KEY}")
        mock_upsert.assert_called_once_with("performances", api_data)

    @patch('requests.get')
    @patch('extract_data.ExtractData._upsert_documents')
    def test_extract_fundamental(self, mock_upsert, mock_get):
        # Arrange
        symbol = 'AAPL'
        api_data = [
            {
                "symbol": "AAPL",
                "cashFlowToDebtRatio": 1.0173,
                "debtRatio": 0.3404,
                "dividendYield": 0.006083954603424043,
                "enterpriseValue": 2535790314090,
                "fairValue": 156.38,
                "grossProfitMargin": 0.4331,
                "marketCapitalization": 2439367314090,
                "netProfitMargin": 0.2531,
                "operatingProfitMargin": 0.3029,
                "priceEarningsRatio": 24.4418,
                "priceEarningsToGrowthRatio": 2.8872,
                "priceToBookRatio": 48.1403,
                "ratingRecommendation": "Strong Buy",
                "ratingScore": 5
            }
        ]
        mock_response = MagicMock()
        mock_response.json.return_value = api_data
        mock_get.return_value = mock_response
        # replace with your actual class
        instance = ExtractData(API_KEY, client, db_name)

        # Act
        instance.extract_fundamental(symbol)

        # Assert
        calls = [
            call(
                f"https://financialmodelingprep.com/api/v3/ratios/{symbol}?apikey={API_KEY}"),
            call().json(),
            call(
                f"https://financialmodelingprep.com/api/v3/rating/{symbol}?limit=1&apikey={API_KEY}"),
            call().json(),
            call(
                f"https://financialmodelingprep.com/api/v3/enterprise-values/{symbol}?limit=1&apikey={API_KEY}"),
            call().json()
        ]
        mock_get.assert_has_calls(calls)


if __name__ == '__main__':
    unittest.main()
