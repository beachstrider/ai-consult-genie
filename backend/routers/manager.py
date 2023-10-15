from typing import List, Optional, Any
from uuid import UUID

from fastapi import APIRouter, HTTPException, Body, Depends
from pymongo import errors
from beanie.exceptions import RevisionIdWasChanged

from utils.password import get_hashed_password
from auth.auth import get_current_manager
import schemas, models


router = APIRouter()

############################################################################################
############################################################################################
###### Super User Manages General User Accounts

@router.get("/user-{userid}", response_model=schemas.UserManagerSchema)
async def read_user(
    userid: UUID, 
    admin_user: models.UserDocument = Depends(get_current_manager)
):
    """
    Read User Info

    ** Restricted to manager **

    """
    user = await models.UserDocument.find_one({"uuid": userid})
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.patch("/user-{userid}", response_model=schemas.UserManagerSchema)
async def update_user(
    userid: UUID,
    update: schemas.UserManagerSchema,
    admin_user: models.UserDocument = Depends(get_current_manager),
) -> Any:
    """
    Update a user.

    ** Restricted to manager **

    """
    user = await models.UserDocument.find_one({"uuid": userid})
    if user.is_manager:
        raise HTTPException(
            status_code=409, detail="The user is the manager of this app, so you can't manage the account."
        )
    if user.is_developer:
        raise HTTPException(
            status_code=409, detail="The user is the developer of this app, so you can't manage the account."
        )
    if update.password is not None:
        update.password = get_hashed_password(update.password)
    user = user.copy(update=update.dict(exclude_unset=True))
    try:
        await user.save()
        return user
    except errors.DuplicateKeyError:
        raise HTTPException(
            status_code=409, detail="User update failed."
        )


@router.delete("/user-{userid}", response_model=schemas.UserManagerSchema)
async def delete_user(
    userid: UUID, 
    admin_user: models.UserDocument = Depends(get_current_manager)
):
    """
    Delete a user.

    ** Restricted to manager **

    """
    user = await models.UserDocument.find_one({"uuid": userid})
    if user.is_manager:
        raise HTTPException(
            status_code=409, detail="The user is the manager of this app, so you can't delete the account."
        )
    if user.is_developer:
        raise HTTPException(
            status_code=409, detail="The user is the developer of this app, so you can't delete the account."
        )
    
    for room_uuid in user.rooms_uuid:
        room = await models.AssistanceRoomDocument.find_one({"uuid": room_uuid})
        room.delete()

    await user.delete()
    return user

