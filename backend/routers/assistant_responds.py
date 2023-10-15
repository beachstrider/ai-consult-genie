from typing import List, Optional, Any
from uuid import UUID
from fastapi import FastAPI, APIRouter, HTTPException
from fastapi import Request, Body, status, HTTPException
from fastapi import Depends, File, UploadFile
from fastapi.responses import StreamingResponse

import ai_engine
import schemas, models
from manage_db import get_recent_msg_pairs, save_msg_pair

from auth.auth import (get_current_active_user,)
from pydantic import BaseModel, EmailStr, Field
import schemas

router = APIRouter()

class AssistanceRequestBodySchema(BaseModel):
    room_uuid: UUID
    msg_text: str


@router.post("/on_text_as_text", response_model=None)
async def on_text_as_text(
    assistance_request_body: AssistanceRequestBodySchema = Body(...),
    current_user: models.UserDocument = Depends(get_current_active_user),
):
    """
    AI responds on a text message as a text message.                 
    """
    print(50*'*')
    room_uuid = assistance_request_body.room_uuid
    user_msg_text = assistance_request_body.msg_text


    room_doc = await models.AssistanceRoomDocument.find_one({'uuid': room_uuid})
    recent_messages = await get_recent_msg_pairs(room_doc=room_doc, num_msg_pairs=1)
    # print("Recent Msgs: ", recent_messages)

    user_doc = await models.UserDocument.find_one({'uuid': room_doc.user_uuid})
    user_name = user_doc.first_name + ' ' + user_doc.last_name

    # Get chat response
    response_text = await ai_engine.assistant_responds_on_text_as_text(
        user_name=user_name,
        user_msg_text=user_msg_text,
        recent_messages=recent_messages,
        assistant_uuid=room_doc.assistant_uuid,
    )
    # print(user_assistant_msgs)
    if not response_text:    # Guard: Ensure output
        raise HTTPException(status_code=400, detail="Failed chat response")
    
    # Store messages
    msg_pair = await save_msg_pair(room_doc, user_msg_text, response_text)
    # print(len(msg_pair))
    print(50*'*')
    
    # Use for Post: Return response text
    return {'msg_pair': msg_pair}


