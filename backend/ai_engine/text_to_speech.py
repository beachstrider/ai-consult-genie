import json
import base64

from elevenlabs import set_api_key, voices, generate, clone

from config.config import settings

ELEVEN_LABS_API_KEY = settings.ELEVEN_LABS_API_KEY
print('ELEVEN_LABS_API_KEY:', ELEVEN_LABS_API_KEY)
set_api_key(ELEVEN_LABS_API_KEY)

voice_shaun = "mTSvIrm2hmcnOvb21nW2"
voice_rachel_id = "21m00Tcm4TlvDq8ikWAM"
voice_antoni = "ErXwobaYiN019PkySvjV"
voice_vin_id = "4bg8qOpTXJbqFLJofqKs"


def get_voices():
    voices_object = voices()
    voices_json = json.dumps(voices.__dict__)
    return voices_json


def convert_text_to_speech(
        text: str, 
        voice: str = None, 
):
    """Convert text to speech
    """    
    print("TTS ...")
    print('Input text:', text)
    print('Voice:', voice)

    if voice == '':
        audio = generate(text=text, 
                         model="eleven_multilingual_v2")
    else:
        audio = generate(text=text, 
                         voice=voice, 
                         model="eleven_multilingual_v2")
        
    audio_base64 = base64.b64encode(audio).decode("utf-8")
        
    return audio_base64


