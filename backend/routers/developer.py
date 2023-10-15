from typing import List, Optional, Any
from uuid import UUID

from fastapi import APIRouter, HTTPException, Body, Depends
from pymongo import errors
from beanie.exceptions import RevisionIdWasChanged

from utils.password import get_hashed_password
from auth.auth import get_current_developer
import schemas, models


router = APIRouter()

############################################################################################
############################################################################################
###### Developer manages AI assistants

@router.post("/create-assistant", response_model=schemas.AssistantDeveloperSchema)
async def create_assistant(
    assistant: schemas.AssistantDeveloperSchema, 
    admin_user: models.UserDocument = Depends(get_current_developer)
):
    """
    Create an assistant.

    ** Restricted to developer **

    """
    assistant_doc = await models.AssistantDocument.find_one({"name": assistant.name})
    if assistant_doc is not None:
        raise HTTPException(status_code=409, detail="The assistant of the name already exists.")

    assistant_doc = models.AssistantDocument(uuid=assistant.uuid,
                                                  name=assistant.name,
                                                  )
    await assistant_doc.create()
    return assistant_doc


@router.get("/assistant-{assistantid}", response_model=schemas.AssistantDeveloperSchema)
async def read_assistant(
    assistant_id: UUID, 
    admin_user: models.UserDocument = Depends(get_current_developer)
):
    """
    Get an assistant info

    ** Restricted to developer **

    """
    assistant_doc = await models.AssistantDocument.find_one({"uuid": assistant_id})
    if assistant_doc is None:
        raise HTTPException(status_code=404, detail="The assistant not found")
    return assistant_doc


@router.patch("/assistant-{assistantid}", response_model=schemas.AssistantDeveloperSchema)
async def update_assistant(
    assistant_id: UUID,
    update: schemas.AssistantDeveloperSchema,
    admin_user: models.UserDocument = Depends(get_current_developer),
) -> Any:
    """
    Update an assistant.

    ** Restricted to developer **

    """
    assistant_doc = await models.AssistantDocument.find_one({"uuid": assistant_id})
    if update.password is not None:
        update.password = get_hashed_password(update.password)
    assistant_doc = assistant_doc.copy(update=update.dict(exclude_unset=True))
    try:
        await assistant_doc.save()
        return assistant_doc
    except errors.DuplicateKeyError:
        raise HTTPException(
            status_code=400, detail="Assistant update failed."
        )


@router.delete("/assistant-{assistantid}", response_model=schemas.AssistantDeveloperSchema)
async def delete_assistant(
    assistant_id: UUID, 
    admin_user: models.UserDocument = Depends(get_current_developer)
):
    """
    Delete an assistant.

    ** Restricted to developer **

    """
    assistant_doc = await models.AssistantDocument.find_one({"uuid": assistant_id})
    await assistant_doc.delete()
    return assistant_doc

