from typing import List, Optional, Any
from uuid import UUID
from fastapi import APIRouter, HTTPException, Body, Depends
import schemas, models
from auth.auth import (get_current_active_user,)

import manage_db

router = APIRouter()


@router.get("/all-translation-records", response_model=List[schemas.TranslationRecordsListItemSchema])
async def list_rooms(
    current_user: models.UserDocument = Depends(get_current_active_user),
):
    """
    List rooms.

    (!Completed)
    """
    print("User: ", current_user.first_name, current_user.last_name)
    print("getting all translation records...")
    translation_records = await manage_db.get_all_translation_records_of_user(
        user_doc=current_user,
    )
    return translation_records


@router.post("/open-record-of-translation_id", response_model=schemas.TranslationRecordGetSchema)
async def open_record(
    translation_id: str = Body(...),
    current_user: models.UserDocument = Depends(get_current_active_user),
):
    """
    Create a new record or get an existing record of the translation_id.

    (!Completed)
    """
    print("User: ", current_user.first_name, current_user.last_name)
    print("opening translation_id: ", translation_id)
    record_doc =  await manage_db.open_record_of_translation_id(
        user_doc=current_user,
        translation_id=translation_id,
    )
    return record_doc


@router.post("/delete-translation-record")
async def delete_translation_record(
    deleteTranslationRecordRequest: schemas.DeleteTranslationRecordRequestSchema = Body(...),
    current_user: models.UserDocument = Depends(get_current_active_user),
):
    """
    Delete a room.
    """
    success = await manage_db.delete_translation_record_uuid(
        user_doc=current_user,
        translation_record_uuid=deleteTranslationRecordRequest.translation_record_uuid,
    )
    return {"success": success}


@router.post("/delete-item-in-translation-record")
async def delete_item_in_translation_record(
    deleteRecordItemRequest: schemas.DeleteTranslationRecordItemRequestSchema = Body(...),
    current_user: models.UserDocument = Depends(get_current_active_user),
):
    """
    Delete an item in a translation record.
    """
    success = await manage_db.delete_item_in_translation_record(
        user_doc=current_user,
        translation_record_uuid=deleteRecordItemRequest.translation_record_uuid,
        record_item_uuid=deleteRecordItemRequest.record_item_uuid,
    )
    return {"success": success}


# @router.get("/clear-room", response_model=schemas.RoomGetSchema)
# async def clear_room(
#     room_uuid: UUID,
#     current_user: models.UserDocument = Depends(get_current_active_user),
# ):
#     """
#     Clear all messages of a room.
#     """

#     return 


# @router.get("/get-open-room-{room_uuid}", response_model=schemas.RoomGetSchema)
# async def get_room(
#     room_uuid: UUID,
#     current_user: models.UserDocument = Depends(get_current_active_user),
# ):
#     """
#     Get a room.

#     (!Completed)
#     """
#     room = await models.AssistanceRoomDocument.find_one({'uuid': room_uuid})
    
#     return room


# @router.get("/get-assistant-{assistant_uuid}", response_model=schemas.AssistantPrivateSchema)
# async def get_assistant(
#     assistant_uuid: UUID,
#     current_user: models.UserDocument = Depends(get_current_active_user),
# ) -> Any:
#     """
#     Get an assistant.

#     (!Completed)
#     """
#     assistant = await models.AssistantDocument.find_one({'uuid': assistant_uuid})
#     return assistant


