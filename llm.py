from dotenv import load_dotenv
from openai import OpenAI

load_dotenv(".env")

client = OpenAI()

def getMessage():
    completion = client.chat.completions.create(
        model="o3-mini",
        messages = [
            {"role": "developer", "content": "You want to explain why a certain stock goes up and down given certain data"},
            {"role": "user", "content": "..."}
        ]
    )

    msg = completion.choices[0].message.content
    print(msg)
    return msg

