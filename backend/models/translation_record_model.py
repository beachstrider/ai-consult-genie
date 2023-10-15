from datetime import datetime
from typing import Optional, List, Tuple, AnyStr
from uuid import UUID, uuid4
from pydantic import BaseModel, EmailStr, Field
from beanie import Document, Indexed
from beanie import PydanticObjectId
from pydantic import EmailStr, Field, BaseModel, validator
from email_validator import validate_email, EmailNotValidError

import schemas

# This is the model that will be saved to the database
class TranslationRecordDocument(Document):
    uuid: UUID = Field(default_factory=uuid4)
    id: str
    title: str = ""
    open_time: datetime =  Field(default_factory=datetime.now)
    user_uuid: UUID
    voice: str = ""

    items: List[schemas.TranslationItemSchema]=[]

