# uvicorn main:app
# uvicorn main:app --reload

# Get Environment Variables
from decouple import config

# Main imports

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient

from config.config import settings
from utils.password import get_hashed_password
import models
from routers.api import api_router
from ai_engine import init_assistants

# Create the app
app: FastAPI = FastAPI(
    title=settings.PROJECT_NAME, 
    version="0.1.0",
    openapi_url=f"{settings.API_VERSION_STR}/openapi.json"
)

# App Root
# Check health
@app.get("/")
async def check_health():
    return {"response": "AdamoAI is healthy !"}

# Set all CORS enabled origins
# if settings.BACKEND_CORS_ORIGINS:
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def start_database():
    app.client = AsyncIOMotorClient(settings.DB_URL)
    await init_beanie(database=app.client[settings.DB_NAME], 
                      document_models=[models.UserDocument,
                                       models.AssistantDocument,
                                       models.AssistanceRoomDocument,
                                       models.TranslationRecordDocument
                                       ])
    user_docs = await models.UserDocument.find_all().to_list()
    for user_doc in user_docs:
        await user_doc.delete()

    managers = settings.MANAGERS
    # print("Managers: ", managers)
    for manager in managers:
        manager_doc: models.UserDocument = await  models.UserDocument.find_one(
            models.UserDocument.email==manager["email"])
        
        if not manager_doc:
            manager_doc = models.UserDocument(
                email=manager["email"].lower(),
                hashed_password=get_hashed_password(manager["pw"]),
                first_name=manager["first_name"],
                last_name=manager["last_name"],
                avatar=manager["avatar"],
                is_active=True,
                is_manager=True,
                is_developer=False,
            )
            await manager_doc.save()


    # await init_assistants()

app.include_router(api_router, prefix=settings.API_VERSION_STR, tags=[])


