import pandas as pd
import json

def getData(path: str) -> str:
    """
    Converts a given csv path to a JSON string with the following format:
    {
      "data": [
          {
            "date": "02/07/2025",
            "price": 107.56,
            "volume": 46082500,
            "open": 109.13,
            "high": 109.92,
            "low": 106.79
          },
          ...
      ]
    }

    Paths:
    https://hacknyu2025lkjyoe.s3.us-east-1.amazonaws.com/amd.csv
    https://hacknyu2025lkjyoe.s3.us-east-1.amazonaws.com/tesla.csv
    https://hacknyu2025lkjyoe.s3.us-east-1.amazonaws.com/capitalone.csv
    https://hacknyu2025lkjyoe.s3.us-east-1.amazonaws.com/alphabetA.csv

    :param path: relative or absolute path to a stocks CSV file.
    :return: JSON string with the reformatted data.
    """
    # Read the CSV into a DataFrame.
    df = pd.read_csv(path)

    # Columns that have dollar values (as strings) that we need to clean.
    dollar_columns = ['Close/Last', 'Open', 'High', 'Low']
    for col in dollar_columns:
        df[col] = df[col].replace('[$,]', '', regex=True).astype(float)

    df["RSI"] = calculate_rsi(path)
    df["7_day_MA"] = seven_day_moving_average(path)

    # Rename columns to match the desired output keys.
    df = df.rename(columns={
        "Date": "date",
        "Close/Last": "price",
        "Volume": "volume",
        "Open": "open",
        "High": "high",
        "Low": "low",
        "RSI": "rsi",
        "7_day_MA": "7_day_ma"
    })

    # Convert the DataFrame to a list of dictionaries.
    data_records = df.to_dict(orient="records")

    # Wrap the list in a dictionary under the "data" key and convert to JSON.
    result = {"data": data_records}
    
    with open("./tests/amd.json", 'w') as json_file:
        json.dump(result, json_file, indent=4)

    return json.dumps(result)
    
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

    return rsi

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

    df['7_day_MA'] = df['Close/Last'].rolling(window=7).mean()

    return df['7_day_MA']

print(getData("./stocks/amd.csv"))
# print(calculate_rsi("https://hacknyu2025lkjyoe.s3.us-east-1.amazonaws.com/tesla.csv"))
# print(seven_day_moving_average("https://hacknyu2025lkjyoe.s3.us-east-1.amazonaws.com/tesla.csv"))