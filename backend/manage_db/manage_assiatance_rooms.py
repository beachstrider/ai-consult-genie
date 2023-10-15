import os
import json
import random
from typing import Optional, List, Tuple, AnyStr
from uuid import UUID

import schemas, models


async def get_all_open_assistant_rooms_of_user(
        user_doc: models.UserDocument
) -> List:
    """
    """
    assistant_rooms =  [ 
        await models.AssistanceRoomDocument.find_one({"uuid": room_uuid})
               for room_uuid in user_doc.rooms_uuid]
    
    return assistant_rooms
    

async def open_room_of_assistant_uuid(
        user_doc: models.UserDocument,
        assistant_uuid: UUID,
) -> models.AssistanceRoomDocument:
    """
    """
    room_doc =  await models.AssistanceRoomDocument.find_one(
        models.AssistanceRoomDocument.assistant_uuid==assistant_uuid, 
        models.AssistanceRoomDocument.user_uuid==user_doc.uuid)
    if (not room_doc):
        room_doc = models.AssistanceRoomDocument(assistant_uuid=assistant_uuid,
                                                       user_uuid=user_doc.uuid,
                                                       )
        await room_doc.create()

        print("Current User: ", user_doc.first_name, user_doc.last_name)
        print("Rooms Ids Before Room Create: ", user_doc.rooms_uuid)
        user_doc.rooms_uuid.append(room_doc.uuid)
        await user_doc.save()
        print("Rooms Ids After Room Create: ", user_doc.rooms_uuid)
    
    return room_doc


async def delete_assistant_room_uuid(
        user_doc: models.UserDocument,
        room_uuid: UUID
) -> bool:
    """
    """
    
    await models.AssistanceRoomDocument.find_one(
        models.AssistanceRoomDocument.uuid==room_uuid, 
        models.AssistanceRoomDocument.user_uuid==user_doc.uuid).delete()
    print("Room ", room_uuid, " deleted!")

    print("Current User: ", user_doc.first_name, user_doc.last_name)
    print("Rooms UUIDs Before Delete: ", user_doc.rooms_uuid)
    user_doc.rooms_uuid.remove(room_uuid)
    await user_doc.save()
    print("Rooms UUIDs After Delete: ", user_doc.rooms_uuid)
    return True


async def delete_message_in_assistant_room(
        user_doc: models.UserDocument,
        room_uuid: UUID,
        message_uuid: UUID,
) -> bool:
    room = await models.AssistanceRoomDocument.find_one({
        "uuid": room_uuid, 
        "user_uuid": user_doc.uuid})

    message_deleted = [message for message in room.messages 
                       if message.uuid==message_uuid]
    print("message_deleted:", message_deleted)
    if message_deleted:
        room.messages.remove(message_deleted[0])
    await room.save()

    return True


################################################################################################
# Get recent message pairs
async def get_recent_msg_pairs(
        room_doc: models.AssistanceRoomDocument, 
        num_msg_pairs: int
) -> List:
    # Initialize messages
    recent_msgs = []
    
    messages = list(room_doc.messages)
    # print("Room Msgs: ", type(messages))

    # Get last 40 messages
    if 0 < len(messages) < 2*num_msg_pairs:
        for item in messages:
            if item.sender_uuid == room_doc.user_uuid:
                msg = {"role": 'user', "content": item.text}
                recent_msgs.append(msg)
            elif item.sender_uuid == room_doc.assistant_uuid:
                msg = {"role": 'assistant', "content": item.text}
                recent_msgs.append(msg)
    elif len(messages) > 2*num_msg_pairs:
        for item in messages[-(2*num_msg_pairs+1):]:
            if item.sender_uuid == room_doc.user_uuid:
                msg = {"role": 'user', "content": item.text}
                recent_msgs.append(msg)
            elif item.sender_uuid == room_doc.assistant_uuid:
                msg = {"role": 'assistant', "content": item.text}
                recent_msgs.append(msg)
    elif len(messages) == 0:
        pass
    
    # Return recent messages
    return recent_msgs


# Save messages for retrieval later on
async def save_msg_pair(
        room: schemas.AssistanceRoomListItemSchema, 
        user_msg_txt: str, 
        assistant_msg_txt: str
) -> schemas.AssistanceMessageSchema:
    print("Storing Messages...")

    room_doc = await models.AssistanceRoomDocument.find_one({"uuid": room.uuid})
    user_msg_doc = schemas.AssistanceMessageSchema(
        sender_uuid=room.user_uuid,
        text=user_msg_txt,
    )
    assistant_msg_doc = schemas.AssistanceMessageSchema(
        sender_uuid=room.assistant_uuid,
        text=assistant_msg_txt,
    )

    # Add messages to data
    room_doc.messages.append(user_msg_doc)
    room_doc.messages.append(assistant_msg_doc)
    await room_doc.save()

    # print(room_doc.messages[-1])

    return (user_msg_doc, assistant_msg_doc)

