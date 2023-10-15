import base64
from uuid import UUID
from typing import List, Optional, Any

import schemas, models

from .chatgpt import chatgpt_for_assistant
from . import google_search  # Import the search module


# def bot_respond(prior_msgs, user_msg, assistant_uuid):
async def assistant_responds_on_text_as_text(
        user_name: str,
        user_msg_text: str,
        recent_messages: List, 
        assistant_uuid: UUID
        ):
    # print("User Message Text: ", user_msg_text)

    assistant_doc = await models.AssistantDocument.find_one({'uuid': assistant_uuid})
    # print(assistant_doc)
    system, before, after = assistant_doc.system, assistant_doc.before, assistant_doc.after
    system = system + f"""

    The user's name is {user_name}    
    """

    # If user's text looks like a search query, perform the search
    search_keyword = google_search.is_search_query(user_msg_text)
    if search_keyword:
        query = user_msg_text.split(search_keyword)[-1].replace("?", "").strip()
        
        search_results = google_search.perform_search(query)
        response_text = google_search.format_search_results_for_text(query, search_results)
        print("Search Result: ", response_text)
    else:
        response_text = await chatgpt_for_assistant(recent_messages, user_msg_text, system, before, after)
        # print("Bot Message Text: ", response_text)

    return response_text


# async def assistant_responds_on_text_as_text_speech(room: schemas.RoomListItemSchema, user_msg_text: str) -> schemas.AssistanceMessageSchema:
#     print("User: ", user_msg_text)

#     recent_messages = await get_recent_msgs(room=room, num_msg_pairs=1)
#     # print("Recent Msgs: ", recent_messages)

#     user_doc = await models.UserDocument.find_one({'uuid': room.user_uuid})
#     assistant_doc = await models.AssistantDocument.find_one({'uuid': room.assistant_uuid})
#     # print(assistant_doc)

#     system, before, after = assistant_doc.system, assistant_doc.before, assistant_doc.after
#     user_name = user_doc.first_name + ' ' + user_doc.last_name
#     system = system + f"""

#     The user's name is {user_name}    
#     """

#     # If user's text looks like a search query, perform the search
#     search_keyword = google_search.is_search_query(user_msg_text)
#     if search_keyword:  # You'll need to define this function
#         query = user_msg_text.split(search_keyword)[-1].replace("?", "").strip()

#         search_results = google_search.perform_search(query)
#         response_text = google_search.format_search_results_for_text(query, search_results)
#         formatted_results_for_audio = google_search.format_search_results_for_speech(query, search_results)
#         print("Search: ", response_text)
#     else:
#         response_text = await chatgpt(recent_messages, user_msg_text, system, before, after)
#         formatted_results_for_audio = response_text
#         print("Bot: ", response_text)

#     # Store messages
#     assistant_msg = await save_msg_pair(room, user_msg_text, response_text)


#     # Convert chat response to audio
#     assistant_msg_audio = convert_text_to_speech(formatted_results_for_audio)
#     assistant_audio_base64 = base64.b64encode(assistant_msg_audio).decode("utf-8")
    

#     return assistant_msg, assistant_audio_base64

