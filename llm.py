from dotenv import load_dotenv
import os
from openai import OpenAI

load_dotenv(".env")

OPENAI_API_KEY = os.environ.get("OPENAI")
client = OpenAI(api_key=OPENAI_API_KEY)

def getMessage(msg):
    completion = client.chat.completions.create(
        model="chatgpt-4o-latest",
        messages = [
            {"role": "developer", "content": "You want to explain why a certain stock goes up and down given certain data"},
            {"role": "user", "content": msg}
        ]
    )

    msg = completion.choices[0].message.content
    print(msg)
    return msg
