from datetime import datetime
from typing import Optional, List, Tuple, AnyStr
from uuid import UUID, uuid4
from pydantic import BaseModel, EmailStr, Field
from beanie import Document, Indexed
from pydantic import EmailStr, Field, BaseModel, validator

import schemas

# This is the model that will be saved to the database
class AssistanceRoomDocument(Document):
    uuid: UUID = Field(default_factory=uuid4)
    open_time: datetime =  Field(default_factory=datetime.now)
    
    assistant_uuid: UUID
    user_uuid: UUID

    assistant_voice: str = ""

    messages: List[schemas.AssistanceMessageSchema]=[]

