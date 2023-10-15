from typing import List, Optional, Any
from uuid import UUID
from fastapi import FastAPI, APIRouter, HTTPException
from fastapi import Request, Body, status, HTTPException
from fastapi import Depends, File, UploadFile
from fastapi.responses import StreamingResponse
import base64

import ai_engine
import models
from auth.auth import (get_current_active_user,)
from pydantic import BaseModel
import schemas
import manage_db

router = APIRouter()


class TranslationRequestBodySchema(BaseModel):
    translation_record_uuid: UUID
    translation_record_item: schemas.TranslationItemSchema


@router.post("/on_request_as_translation_text", response_model=None)
async def on_request_as_translation_text(
    translation_request_body: TranslationRequestBodySchema = Body(...),
    current_user: models.UserDocument = Depends(get_current_active_user),
):
    """
    Translator responds on a text as the translation text.                 
    """
    print(50*'*')
    translation_record_item: schemas.TranslationItemSchema = translation_request_body.translation_record_item.model_copy()
    
    # Get translation response
    translation_text, price = await ai_engine.translator_responds_on_text_as_translation(
        translation_request=translation_request_body.translation_record_item
    )
    if not translation_text:    # Guard: Ensure output
        raise HTTPException(status_code=400, detail="Failed in GPT translation ")
    # print(translation)

    translation_record_item.translation_text = translation_text

    await manage_db.manage_translation_records.save_translation_record_item(
        translation_record_uuid=translation_request_body.translation_record_uuid,
        translation_item=translation_record_item
    )

    print(50*'*')

    # Use for Post: Return response text
    return {'translation_record_item': translation_record_item}



