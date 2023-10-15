from typing import List, Optional, Any
from uuid import UUID
from fastapi import APIRouter, HTTPException, Body, Depends

import schemas, models
import manage_db

from auth.auth import (get_current_active_user,)


router = APIRouter()


@router.get("/all-open-rooms", response_model=List[schemas.AssistanceRoomListItemSchema])
async def all_open_assistant_rooms_of_user(
        current_user: models.UserDocument = Depends(get_current_active_user),
):
    """
    List all assistant rooms of the user.

    (!Completed)
    """
    # print
    assistant_rooms = await manage_db.get_all_open_assistant_rooms_of_user(
        user_doc=current_user
    )
    # print(rooms)

    return assistant_rooms


@router.post("/open-room-of-assistant_uuid", response_model=schemas.AssistanceRoomGetSchema)
async def create_room(
        assistant_uuid: UUID = Body(...),
        current_user: models.UserDocument = Depends(get_current_active_user),
):
    """
    Create a new or get an existing assistant room of the user.

    (!Completed)
    """
    assistant_room = await manage_db.open_room_of_assistant_uuid(
        user_doc=current_user,
        assistant_uuid=assistant_uuid,
    )

    return assistant_room


@router.post("/delete-assistant-room_uuid")
async def delete_room(
        deleteAssistanceRoomRequest: schemas.DeleteAssistanceRoomRequestSchema,
        current_user: models.UserDocument = Depends(get_current_active_user),
):
    """
    Delete an assistant room of the user.
    """
    success = await manage_db.delete_assistant_room_uuid(
        user_doc=current_user,
        room_uuid=deleteAssistanceRoomRequest.assistance_room_uuid
    )
    return {"success": success}
    
    
@router.post("/delete-message-in-assistant-room")
async def delete_message(
        deleteAssistanceRoomMessageRequest: schemas.DeleteAssistanceRoomMessageRequestSchema,
        current_user: models.UserDocument = Depends(get_current_active_user),
):
    """
    Delete a message.
    """
    success = await manage_db.delete_message_in_assistant_room(
        user_doc=current_user,
        room_uuid=deleteAssistanceRoomMessageRequest.assistance_room_uuid,
        message_uuid=deleteAssistanceRoomMessageRequest.room_message_uuid,
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


# @router.get("/set-room", response_model=schemas.RoomGetSchema)
# async def set_room(
#     room_doc: schemas.RoomGetSchema,
#     current_user: models.UserDocument = Depends(get_current_active_user),
# ):
#     """
#     Set the parameters of a room.
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


