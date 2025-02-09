from dotenv import load_dotenv
import os
from openai import OpenAI

load_dotenv(".env")

OPENAI_API_KEY = os.environ.get("OPENAI")
client = OpenAI(api_key=OPENAI_API_KEY)

def getMessage(stock_info, news):
    completion = client.chat.completions.create(
        model="chatgpt-4o-latest",
        messages = [
            {"role": "user", 
             "content": f"""Given this json about a certain company's ock info, RSI, and MA {stock_info},
                        and provided news articles {news} for January. Only look at the values from 01/02 to 01/31. 
                        Explain the price difference from 02/07 from 01/31 only from the information provided.
             """}
        ]
    )

    msg = completion.choices[0].message.content
    # print(msg)
    return msg

def getNews(stock_name):
    OPENAI_API_KEY = os.environ.get("sonar")
    client = OpenAI(api_key=OPENAI_API_KEY, base_url="https://api.perplexity.ai")
    completion = client.chat.completions.create(
        model="sonar-pro",
        messages = [
            {
                "role": "system",
                "content": (
                    "You are an artificial intelligence assistant and you need to "
                    "engage in a helpful, detailed, polite conversation with a user."
                ),
            },
            {"role": "user", 
             "content": f"""Get 3 of the most impactful news articles about {stock_name} from the month of January 
             which could effect their stock in Febuary and just have the titles in a bulleted list."""}
        ]
    )

    msg = completion.choices[0].message.content
    # print(msg)
    return msg

print(getNews("tesla"))