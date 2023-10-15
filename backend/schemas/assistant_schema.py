from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field
from beanie import PydanticObjectId
from uuid import UUID


class AssistantPublicSchema(BaseModel):
    """
    Shared User properties. Visible by anyone.
    """

    id: Optional[PydanticObjectId] = Field(alias="_id")
    uuid: UUID
    
    persona: str = Field(..., min_length=3, max_length=30)
    name: str = Field(max_length=30)
    age: Optional[str] = Field(..., min_length=1, max_length=30)
    gender:  Optional[str] = Field(..., min_length=1, max_length=30)
    voice:  Optional[str] = Field(..., min_length=1, max_length=30)
    avatar: Optional[str] = None
    description: Optional[str] = None


class AssistantPrivateSchema(AssistantPublicSchema):
    """
    Shared Assistant properties. Visible only by admins and self.
    """

    # voice: Optional[str] = None
    # language : Optional[str]
    pass


class AssistantManagerSchema(AssistantPrivateSchema):
    """
    User properties returned by API. Contains private
    user information such as email, is_active, auth provider.

    Should only be returned to admins or self.
    """

    created_at: Optional[datetime] = None
    provider: Optional[str] = None


class AssistantDeveloperSchema(AssistantManagerSchema):
    """
    User properties returned by API. Contains private
    user information such as email, is_active, auth provider.

    Should only be returned to admins or self.
    """

    system: Optional[str] = None
    before: Optional[str] = None
    after: Optional[str] = None

