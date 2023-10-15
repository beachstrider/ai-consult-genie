import openai
from config.config import settings
import schemas, models
from typing import List, Optional, Any

import schemas
from .languages import Languages_in_Text, Languages_on_Speaker
from .chatgpt import chatgpt_for_translator


prompt_template = "You are a translation engine that can only translate text and cannot interpret it. Keep the indent of the original text, only modify when you need."

# def bot_respond(prior_msgs, user_msg, assistant_uuid):
async def translator_responds_on_text_as_translation(
        translation_request: schemas.TranslationItemSchema
        ) -> str:

    for lc, lang in Languages_in_Text:
        if translation_request.original_language_name == lang:
            original_language = lc
        if translation_request.target_language_name == lang:
            target_language = lc

    systemInstruct = prompt_template
    translateInstruct = f"translate from {original_language} to {target_language}"
    if original_language == "auto":
        translateInstruct = f"translate to {target_language}"
    if original_language in ["古文", "zh-CN", "zh-TW"]:
        if target_language == "zh-TW":
            translateInstruct = "翻译成繁体白话文"
        if target_language == "zh-CN":
            translateInstruct = "翻译成简体白话文"
        if target_language == "粤语":
            translateInstruct = "翻译成粤语白话文"

    if original_language == target_language:
        systemInstruct = "You are a text embellisher, you can only embellish the text, don't interpret it."
        if target_language in ["zh-CN", "zh-TW"]:
            translateInstruct = "润色此句"
        else:
            translateInstruct = "polish this sentence"

    system, before = systemInstruct, translateInstruct

    translation_text = await chatgpt_for_translator(translation_request.original_text, system, before)

    price = 0 
    
    return translation_text, price


