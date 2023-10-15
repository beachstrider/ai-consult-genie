from .token_model import Token, TokenPayload
from .user_model import UserDocument
from .assistant_model import AssistantDocument
from .assistance_room_model import AssistanceRoomDocument
from .translation_record_model import TranslationRecordDocument

from enum import Enum
from bson import ObjectId
from typing import Optional
from pydantic import Field, BaseModel, validator
from beanie import PydanticObjectId


class MongoBaseModel(BaseModel):
    id: PydanticObjectId = Field(default_factory=PydanticObjectId, alias="_id")

    class Config:
        json_encoders = {ObjectId: str}
