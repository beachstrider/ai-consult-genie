# from openai_requests import convert_audio_to_text, get_chat_response
from .chatgpt import chatgpt_for_assistant, chatgpt_for_translator

from .speech_to_text import convert_speech_to_text
from .text_to_speech import convert_text_to_speech

from .initialize_assistants import init_assistants
from .assistant import assistant_responds_on_text_as_text

from .translator import translator_responds_on_text_as_translation

