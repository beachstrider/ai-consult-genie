import openai
from fastapi import FastAPI, APIRouter, HTTPException

from config.config import settings


async def chatgpt_for_assistant(recent_msgs=[], user_msg_txt="", system="", before="", after=""):
    """ Open AI - Chat GPT
    """
    # Retrieve Enviornment Variables
    # openai.organization = settings.OPEN_AI_ORG
    openai.api_key = settings.OPENAI_API_KEY

    messages = []
    messages.append({"role": "system", "content": system})
    messages += recent_msgs
    messages.append({"role": "user", "content": before + user_msg_txt + after})
    print("User Msg Text: ", user_msg_txt)

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages
    )
    if not response:    # Guard: Ensure output
        raise HTTPException(status_code=400, detail="Failed in chatgpt response")
    print("Chat gen success!")

    bot_text = response["choices"][0]["message"]["content"]
    print("Bot Msg Text: ", bot_text)

    return bot_text


async def chatgpt_for_translator(original_txt, system, before):
    """ Open AI - Chat GPT
    """
    # Retrieve Enviornment Variables
    # openai.organization = settings.OPEN_AI_ORG
    openai.api_key = settings.OPENAI_API_KEY

    messages = []
    messages.append({"role": "system", "content": system})
    messages.append({"role": "user", "content": before})
    messages.append({"role": "user", "content": original_txt})
    print("Original Text: ", original_txt)

    openai_response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages,
        temperature=0,
        max_tokens=1000,
        top_p=1,
        stream=True,
        frequency_penalty=1,
        presence_penalty=1,
    )

    combined = ""
    for resp in openai_response:
        delta = resp["choices"][0]["delta"]
        if "content" in delta:
            combined += delta["content"]

    translation_text = combined
    print("Translation Text: ", translation_text)

    return translation_text
    