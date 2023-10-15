from datetime import datetime
from typing import Optional, List, AnyStr
from uuid import UUID, uuid4
from beanie import Indexed, Document
from pydantic import Field


# This is the model that will be saved to the database
class AssistantDocument(Document):
    uuid: UUID = Field(default_factory=uuid4)
    
    ### Personal Info ################
    persona: str = Field(..., min_length=1, max_length=30)
    name: str = Field(max_length=15)
    age: Optional[str] = Field(..., min_length=1, max_length=30)
    gender:  Optional[str] = Field(..., min_length=1, max_length=30)
    voice:  Optional[str] = Field(..., min_length=1, max_length=30)
    avatar: str = ""
    description: str = ""

    created_at: datetime = Field(default_factory=datetime.now)
    provider: str = ""

    system: str = ""
    before: str = ""
    after: str = ""

    # rooms: Optional[List[AnyStr]]

    like_users_uuids:  List[UUID] = []


