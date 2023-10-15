from typing import List, Optional, Any
from uuid import UUID

from fastapi import APIRouter, HTTPException, Body, Depends
from pymongo import errors
from beanie.exceptions import RevisionIdWasChanged

from utils.password import get_hashed_password
from auth.auth import get_current_active_user
import schemas, models


router = APIRouter()

############################################################################################
###### Logged-in User Manages His Account

@router.get("/read_me", response_model=schemas.UserPublicSchema)
async def read_me(
    current_user: models.UserDocument = Depends(get_current_active_user),
) -> Any:
    """
    Get current user.
    """
    return current_user


@router.patch("/update_me", response_model=schemas.UserPrivateSchema)
async def update_me(
    update: schemas.UserPrivateSchema,
    current_user: models.UserDocument = Depends(get_current_active_user),
) -> Any:
    """
    Update current user.
    """
    update_data = update.model_dump(exclude={"is_active",}, exclude_unset=True)
    try:
        if update_data["password"]:
            update_data["hashed_password"] = get_hashed_password(
                update_data["password"]
            )
            del update_data["password"]
    except KeyError:
        pass
    current_user = current_user.model_copy(update=update_data)
    try:
        await current_user.save()
        return current_user
    except (errors.DuplicateKeyError, RevisionIdWasChanged):
        raise HTTPException(
            status_code=400, detail=""
        )


@router.delete("/delete_me", response_model=schemas.UserPrivateSchema)
async def delete_me(
    current_user: models.UserDocument = Depends(get_current_active_user)
) -> Any:
    """
    Delete current user.
    """
    await current_user.delete()
    return current_user


# @router.get("/list-users", response_model=List[schemas.UserPublicSchema])
# async def list_users(
#     limit: Optional[int] = 10,
#     offset: Optional[int] = 0,
#     user: models.UserDocument = Depends(get_current_active_user),
# ):
#     users = await models.UserDocument.find_all().skip(offset).limit(limit).to_list()
#     return users

