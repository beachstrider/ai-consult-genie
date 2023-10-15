from datetime import date, datetime
from typing import Optional, List
from pydantic import BaseModel, EmailStr, Field, constr
from beanie import PydanticObjectId
from uuid import UUID


class UserRegisterSchema(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    password: str


class UserLoginSchema(BaseModel):
    email: EmailStr
    password: constr(min_length=6)


class UserRequestSchema(BaseModel):
    user_uuid: str
    token: str | None = None


class UserResponseSchema(BaseModel):
    first_name: str
    last_name: str
    email: str
    avatar: str
    id: str



############################

class UserPublicSchema(BaseModel):
    """
    Shared User properties. Visible to anyone.
    """
    uuid: UUID

    first_name: Optional[str] = None
    last_name: Optional[str] = None
    avatar: Optional[str] = None


class UserPrivateSchema(UserPublicSchema):
    """
    Private User properties. Visible only to self and admins.
    """
    email: Optional[EmailStr] = None
    password: Optional[str] = None
    is_active: Optional[bool] = True
    
    phone: Optional[str]
    birthday: Optional[date] = None
    language : Optional[str]

    plan: Optional[str]
    haptic: bool = True
    light_theme: bool = True

    provider: Optional[str] = None

    created_at: Optional[datetime] = None
    updated_at: datetime | None = None
    accessed_last: Optional[datetime] = None

    rooms_uuid: Optional[List]
    translation_records_uuids: Optional[List[UUID]]
    

############################

class UserManagerSchema(UserPrivateSchema):
    """
    User properties returned by API. Contains private
    user information such as email, is_active, auth provider.

    Should only be returned to admins.
    """
    is_manager: Optional[bool] = False


class UserDeveloperSchema(UserPrivateSchema):
    """
    User properties returned by API. Contains private
    user information such as email, is_active, auth provider.

    Should only be returned to admins.
    """
    is_developer: Optional[bool] = False
