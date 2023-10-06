import pandas as pd
import requests
from bs4 import BeautifulSoup
from main import insert_documents

# Fetching the data from the internet
url = 'https://en.wikipedia.org/wiki/List_of_S%26P_500_companies'
html = requests.get(url).content
soup = BeautifulSoup(html, 'html.parser')
# Extracting the table containing the data
table = soup.find('table', {'class': 'wikitable sortable'})
# Extracting the required columns
symbol = []
company_name = []
industry = []
sector = []
for row in table.findAll('tr')[1:]:
    col = row.findAll('td')
    symbol.append(col[0].text.strip())
    company_name.append(col[1].text.strip())
    industry.append(col[3].text.strip())
    sector.append(col[4].text.strip())
# Creating a DataFrame to store the data
data = pd.DataFrame({'Symbol': symbol, 'Company Name': company_name, 'Industry': industry, 'Sector': sector})

# Convert DataFrame to list of dictionaries for insertion into MongoDB
data_dict = data.to_dict("records")

insert_documents("test", "companies", data_dict, overwrite=True)

