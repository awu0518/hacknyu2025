from dotenv import load_dotenv
import os
from openai import OpenAI

load_dotenv(".env")

OPENAI_API_KEY = os.environ.get("OPENAI")
client = OpenAI(api_key=OPENAI_API_KEY)

def getMessage(stock_info, RSI, SMA, news):
    completion = client.chat.completions.create(
        model="chatgpt-4o-latest",
        messages = [
            {"role": "user", 
             "content": f"""Given this csv about a certain companies stock {stock_info}, RSI {RSI}, SMA {SMA},
                        and provided news articles {news}. Only look at the values from the month before the most 
                        recent date from the csv. Explain why the stock price is going up or down in the next month.
             """}
        ]
    )

    msg = completion.choices[0].message.content
    print(msg)
    return msg

def getNews(stock_name):
    completion = client.chat.completions.create(
        model="chatgpt-4o-latest",
        messages = [
            {"role": "user", 
             "content": f"Get news articles about {stock_name} from the month of January and provide a brief summary of them."}
        ]
    )

    msg = completion.choices[0].message.content
    print(msg)
    return msg
