from typing import List, Optional, Any
from uuid import UUID
from fastapi import APIRouter, HTTPException, Body, Depends
import schemas, models
from auth.auth import (get_current_active_user,)

router = APIRouter()


@router.get("/list-users", response_model=List[schemas.UserPublicSchema])
async def list_users(
    limit: Optional[int] = 10,
    offset: Optional[int] = 0,
    current_user: models.UserDocument = Depends(get_current_active_user),
):
    """
    List users.
    """
    users = await models.UserDocument.find_all().skip(offset).limit(limit).to_list()
    return users


@router.get("/create-channel", response_model=schemas.UserPublicSchema)
async def create_channel(
    limit: Optional[int] = 10,
    offset: Optional[int] = 0,
    current_user: models.UserDocument = Depends(get_current_active_user),
):
    """
    Get users.
    """
    users = await models.UserDocument.find_all().skip(offset).limit(limit).to_list()
    return users


@router.get("/get-channel", response_model=schemas.UserPublicSchema)
async def get_channel(
    limit: Optional[int] = 10,
    offset: Optional[int] = 0,
    current_user: models.UserDocument = Depends(get_current_active_user),
):
    """
    Get users.
    """
    users = await models.UserDocument.find_all().skip(offset).limit(limit).to_list()
    return users


@router.get("/list-channels", response_model=List[schemas.UserPublicSchema])
async def list_channels(
    limit: Optional[int] = 10,
    offset: Optional[int] = 0,
    current_user: models.UserDocument = Depends(get_current_active_user),
):
    """
    List Rooms.
    """
    users = await models.UserDocument.find_all().skip(offset).limit(limit).to_list()
    return users



@router.get("/delete-channel", response_model=schemas.UserPublicSchema)
async def delete_channel(
    limit: Optional[int] = 10,
    offset: Optional[int] = 0,
    current_user: models.UserDocument = Depends(get_current_active_user),
):
    """
    Get users.
    """
    users = await models.UserDocument.find_all().skip(offset).limit(limit).to_list()
    return users


@router.get("/set-channel", response_model=schemas.UserPublicSchema)
async def set_channel(
    limit: Optional[int] = 10,
    offset: Optional[int] = 0,
    current_user: models.UserDocument = Depends(get_current_active_user),
):
    """
    Get users.
    """
    users = await models.UserDocument.find_all().skip(offset).limit(limit).to_list()
    return users


@router.get("/clear-channel", response_model=schemas.UserPublicSchema)
async def clear_channel(
    limit: Optional[int] = 10,
    offset: Optional[int] = 0,
    current_user: models.UserDocument = Depends(get_current_active_user),
):
    """
    Get users.
    """
    users = await models.UserDocument.find_all().skip(offset).limit(limit).to_list()
    return users


