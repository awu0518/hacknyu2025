import pandas as pd
import requests
import json

def getData(path: str) -> pd.DataFrame:
    """
    Converts a given csv path to a Pandas Dataframe
    Paths:
    https://hacknyu2025lkjyoe.s3.us-east-1.amazonaws.com/amd.csv
    https://hacknyu2025lkjyoe.s3.us-east-1.amazonaws.com/tesla.csv
    https://hacknyu2025lkjyoe.s3.us-east-1.amazonaws.com/capitalone.csv
    https://hacknyu2025lkjyoe.s3.us-east-1.amazonaws.com/alphabetA.csv

    :param path: relative path to a stocks folder csv
    :return: Pandas DataFrame containing the information about the stock
    """

    df = pd.read_csv(path)
    # Columns with dollar values
    dollar_columns = ['Close/Last', 'Open', 'High', 'Low']

    # Remove the dollar sign and convert to numeric
    for col in dollar_columns:
        df[col] = df[col].replace('[$,]', '', regex=True).astype(float)

    return df
    
def calculate_rsi(path: str, period=14) -> str:
    """
    Calculate the Relative Strength Index (RSI) for a given dataset.

    :param data: Pandas Series of closing prices.
    :return: Pandas Series containing the RSI values.
    """
    df = pd.read_csv(path)
    # Columns with dollar values
    dollar_columns = ['Close/Last', 'Open', 'High', 'Low']

    # Remove the dollar sign and convert to numeric
    for col in dollar_columns:
        df[col] = df[col].replace('[$,]', '', regex=True).astype(float)
    # Calculate price changes
    delta = df['Close/Last'].diff()

    # Separate gains and losses
    gain = delta.where(delta > 0, 0)
    loss = -delta.where(delta < 0, 0)

    # Calculate the average gain and loss
    avg_gain = gain.rolling(window=period, min_periods=1).mean()
    avg_loss = loss.rolling(window=period, min_periods=1).mean()

    # Calculate Relative Strength (RS)
    rs = avg_gain / avg_loss

    # Calculate RSI
    rsi = 100 - (100 / (1 + rs))
    return rsi[14:].to_json()

def seven_day_moving_average(path: str) -> str:
    """
    Calculate the 7 day moving average for a given dataset

    :param data: Pandas Series of closing prices.
    :return: Pandas Series containing the moving average, first 6 spots will be NaN as there is not enough info
    """
    df = pd.read_csv(path)
    # Columns with dollar values
    dollar_columns = ['Close/Last', 'Open', 'High', 'Low']

    # Remove the dollar sign and convert to numeric
    for col in dollar_columns:
        df[col] = df[col].replace('[$,]', '', regex=True).astype(float)

    return df['Close/Last'].rolling(window=7).mean()[14:].to_json()

print(calculate_rsi("https://hacknyu2025lkjyoe.s3.us-east-1.amazonaws.com/tesla.csv"))
print(seven_day_moving_average("https://hacknyu2025lkjyoe.s3.us-east-1.amazonaws.com/tesla.csv"))