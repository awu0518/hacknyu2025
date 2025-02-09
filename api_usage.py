import pandas as pd
import requests
import json

# get_rsi
api_url = "https://748xcif1ai.execute-api.us-east-1.amazonaws.com/get_rsi"
payload = {
    "csv_url": "https://hacknyu2025lkjyoe.s3.us-east-1.amazonaws.com/amd.csv",  # Adjust the file path if needed.
    "period": 14
}
headers = {
    "Content-Type": "application/json"
}
response = requests.get(api_url, json=payload, headers=headers)
if response.status_code == 200:
    print("RSI Calculation Successful!")
    # The response body will be the JSON string returned by your Lambda function.
    print("Response data:", response.json())
else:
    print("Error:", response.status_code)
    print("Response:", response.text)
response = requests.post(api_url, json=payload, headers=headers)


# get_moving_average
# The API Gateway endpoint for the seven_day_moving_average Lambda function.
api_url = "https://v7e5cm8cd3.execute-api.us-east-1.amazonaws.com/get_moving_average"
# The payload should include the CSV URL. Adjust the CSV URL if needed.
payload = {
    "csv_url": "https://hacknyu2025lkjyoe.s3.us-east-1.amazonaws.com/amd.csv"
}
response = requests.post(api_url, json=payload, headers=headers)
# Process the response.
if response.status_code == 200:
    print("7-Day Moving Average Calculation Successful!")
    # The API returns a JSON string; parse it to a Python dictionary if needed.
    result = response.json()
    print("Response data:", result)
else:
    print("Error:", response.status_code)
    print("Response:", response.text)


# get all data
api_url = "https://mfvqo6rzzj.execute-api.us-east-1.amazonaws.com/gd"
response = requests.post(api_url, json=payload, headers=headers)
# Process the response.
if response.status_code == 200:
    print("Data get successfully")
    # The API returns a JSON string; parse it to a Python dictionary if needed.
    result = response.json()
    print("Response data:", result)
else:
    print("Error:", response.status_code)
    print("Response:", response.text)


# get GPT analyze
api_url = "https://v2zlde1262.execute-api.us-east-1.amazonaws.com/get_analyze"
payload = {
    "stock_info": "test",
    "RSI": "test",
    "SMA": "test",
    "news": "test"
}
response = requests.get(api_url, json=payload, headers=headers)
# Process the response.
if response.status_code == 200:
    print("Data get successfully")
    # The API returns a JSON string; parse it to a Python dictionary if needed.
    result = response.json()
    print("Response data:", result)
else:
    print("Error:", response.status_code)
    print("Response:", response.text)


