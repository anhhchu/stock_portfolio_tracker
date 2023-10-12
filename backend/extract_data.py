import requests

class ExtractData:
    def __init__(self, api_key, client, db_name):
        self.client = client
        self.API_KEY = api_key
        self.db = self.client[db_name]

    def _delete_documents(self, collection_name):
        """
        Delete all documents in the collection
        """
        # Delete all documents in the collection
        if collection_name not in self.db.list_collection_names():
            self.db.create_collection(collection_name)
        collection = self.db[collection_name]
        collection.delete_many({})

    def _insert_documents(self, collection_name, data, overwrite=False):
        """
        This method inserts the provided documents into a MongoDB database.

        Parameters:
        * data: A dictionary containing the documents to be inserted.
        * overwrite: A boolean flag. If set to True, all existing documents in the collection will be deleted before the new documents are inserted.

        The method operates on a specified database and collection. The 'data' parameter should contain the documents to be inserted into the collection. If 'overwrite' is set to True, the method will first remove all existing documents in the collection before inserting the new ones.
        """
        if collection_name not in self.db.list_collection_names():
            self.db.create_collection(collection_name)
        collection = self.db[collection_name]
        
        if overwrite:
            # Delete all documents from the collection
            self._delete_documents(collection_name)

        # Insert data into MongoDB
        try:
            collection.insert_many(data)
            print(f"{len(data)} documents inserted into MongoDB")
        except Exception as e:
            print("Fail to insert data")
            print(e)


    def _upsert_documents(self, collection_name, symbols_data):
        """
        Upsert documents in the collection
        """
        if collection_name not in self.db.list_collection_names():
            self.db.create_collection(collection_name)
        collection = self.db[collection_name]

        for data in symbols_data:
            symbol = data.pop("symbol")
            result = collection.update_one(
                {"symbol": symbol},  # condition
                {"$set": data},  # update
                upsert=True  # if not found, insert
            )

    def extract_quote(self, symbols):
        """
        Extract quote and upsert to the database
        """
        url = f"https://financialmodelingprep.com/api/v3/quote/{symbols}?apikey={self.API_KEY}"
        try:
            response = requests.get(url)
            response.raise_for_status()  # Raise an exception for HTTP errors (4xx and 5xx)
            data = response.json()
            self._upsert_documents("quotes", data)
            print(f"Data retrieved and inserted successfully: {symbols}")
        except requests.exceptions.RequestException as e:
            print(f"Request error: {e}")
        except requests.exceptions.HTTPError as e:
            print(f"HTTP error: {e}")
        except Exception as e:
            print(f"An unexpected error occurred: {e}")

    def extract_performance(self, symbols):
        """
        Extract performance and upsert to the database
        """
        url = f"https://financialmodelingprep.com/api/v3/stock-price-change/{symbols}?apikey={self.API_KEY}"
        try:
            response = requests.get(url)
            response.raise_for_status()  # Raise an exception for HTTP errors (4xx and 5xx)
            data = response.json()
            self._upsert_documents("performances", data)
            print(f"Data retrieved and inserted successfully: {symbols}")
        except requests.exceptions.RequestException as e:
            print(f"Request error: {e}")
        except requests.exceptions.HTTPError as e:
            print(f"HTTP error: {e}")
        except Exception as e:
            print(f"An unexpected error occurred: {e}")


    def extract_fundamental(self, symbol):
        """
        Extract fundamental and upsert to the database
        """
        url = f"https://financialmodelingprep.com/api/v3/ratios/{symbol}?apikey={self.API_KEY}"
        url2 = f"https://financialmodelingprep.com/api/v3/rating/{symbol}?limit=1&apikey={self.API_KEY}"
        url3 = f"https://financialmodelingprep.com/api/v3/enterprise-values/{symbol}?limit=1&apikey={self.API_KEY}"
        try:
            response = requests.get(url)
            data = response.json()[0]

            response2 = requests.get(url2)
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

            self._upsert_documents("fundamentals", json_data)
            print(f"Data retrieved and inserted successfully: {symbol}")
        except requests.exceptions.RequestException as e:
            print(f"Request error: {e}")
        except requests.exceptions.HTTPError as e:
            print(f"HTTP error: {e}")
        except Exception as e:
            print(f"An unexpected error occurred: {e}")
