from typing import List, Optional, Any
from uuid import UUID
from fastapi import APIRouter, HTTPException, Body, Depends
import schemas, models
from auth.auth import (get_current_active_user,)

router = APIRouter()


@router.get("/list-tools", response_model=List[schemas.UserPublicSchema])
async def list_tools(
    limit: Optional[int] = 10,
    offset: Optional[int] = 0,
    current_user: models.UserDocument = Depends(get_current_active_user),
):
    """
    List users.
    """
    users = await models.UserDocument.find_all().skip(offset).limit(limit).to_list()
    return users


@router.get("/create-ground", response_model=schemas.UserPublicSchema)
async def create_ground(
    limit: Optional[int] = 10,
    offset: Optional[int] = 0,
    current_user: models.UserDocument = Depends(get_current_active_user),
):
    """
    Get users.
    """
    users = await models.UserDocument.find_all().skip(offset).limit(limit).to_list()
    return users


@router.get("/get-ground", response_model=schemas.UserPublicSchema)
async def get_ground(
    limit: Optional[int] = 10,
    offset: Optional[int] = 0,
    current_user: models.UserDocument = Depends(get_current_active_user),
):
    """
    Get users.
    """
    users = await models.UserDocument.find_all().skip(offset).limit(limit).to_list()
    return users


@router.get("/list-grounds", response_model=List[schemas.UserPublicSchema])
async def list_grounds(
    limit: Optional[int] = 10,
    offset: Optional[int] = 0,
    current_user: models.UserDocument = Depends(get_current_active_user),
):
    """
    List Rooms.
    """
    users = await models.UserDocument.find_all().skip(offset).limit(limit).to_list()
    return users



@router.get("/delete-ground", response_model=schemas.UserPublicSchema)
async def delete_ground(
    limit: Optional[int] = 10,
    offset: Optional[int] = 0,
    current_user: models.UserDocument = Depends(get_current_active_user),
):
    """
    Get users.
    """
    users = await models.UserDocument.find_all().skip(offset).limit(limit).to_list()
    return users


@router.get("/set-ground", response_model=schemas.UserPublicSchema)
async def set_ground(
    limit: Optional[int] = 10,
    offset: Optional[int] = 0,
    current_user: models.UserDocument = Depends(get_current_active_user),
):
    """
    Get users.
    """
    users = await models.UserDocument.find_all().skip(offset).limit(limit).to_list()
    return users


@router.get("/clear-ground", response_model=schemas.UserPublicSchema)
async def set_ground(
    limit: Optional[int] = 10,
    offset: Optional[int] = 0,
    current_user: models.UserDocument = Depends(get_current_active_user),
):
    """
    Get users.
    """
    users = await models.UserDocument.find_all().skip(offset).limit(limit).to_list()
    return users


