import pandas as pd

def getData(path: str) -> pd.DataFrame:
    """
    Converts a given csv path to a Pandas Dataframe

    :param path: relative path to a stocks folder csv
    :return: Pandas DataFrame containing the information about the stock
    """

    return pd.read_csv(path)
    
def calculate_rsi(data: pd.Series) -> str:
    """
    Calculate the Relative Strength Index (RSI) for a given dataset.

    :param data: Pandas Series of closing prices.
    :return: Pandas Series containing the RSI values.
    """
    period = data.size()
    delta = data.diff(1)  # Calculate price changes
    gain = (delta.where(delta > 0, 0)).rolling(window=period).mean()  # Average gain
    loss = (-delta.where(delta < 0, 0)).rolling(window=period).mean()  # Average loss

    rs = gain / loss  # Relative Strength
    rsi = 100 - (100 / (1 + rs))  # RSI formula

    return rsi.to_json()

def seven_day_moving_average(data: pd.Series) -> str:
    """
    Calculate the 7 day moving average for a given dataset

    :param data: Pandas Series of closing prices.
    :return: Pandas Series containing the moving average, first 6 spots will be NaN as there is not enough info
    """

    return data.rolling(window=7).mean().to_json


