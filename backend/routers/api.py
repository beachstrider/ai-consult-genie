from fastapi import APIRouter
from . import preview
from . import auth, user, manager, developer
from . import voice_service
from . import assistance_rooms, assistant_responds
from . import translation_records, translator_responds

api_router = APIRouter()

# Check API Health
@api_router.get("/")
async def root():
    """Check API Health
    """
    return {"message": "Welcome to the backend API for FARM-docker operational of Adamo AI !"}


api_router.include_router(preview.router, prefix="", tags=["Preview Service"])

api_router.include_router(auth.router, prefix="", tags=["Auth Service"])

api_router.include_router(user.router, prefix="", tags=["User Service"])
api_router.include_router(manager.router, prefix="", tags=["Manager manages user accounts"])
api_router.include_router(developer.router, prefix="", tags=["Developer manages AI assistants"])

api_router.include_router(voice_service.router, prefix="/voice_service", tags=["Voice Service"])

api_router.include_router(assistant_responds.router, prefix="/assistant_responds", tags=["Assistant Service"])
api_router.include_router(translator_responds.router, prefix="/translator_responds", tags=["Translator Service"])

api_router.include_router(assistance_rooms.router, prefix="", tags=["Assistance Rooms Service"])
api_router.include_router(translation_records.router, prefix="", tags=["Translation Records Service"])
# api_router.include_router(channels.router, prefix="", tags=["Communication Channel Requests for Logged-in Users"])
# api_router.include_router(playgrounds.router, prefix="", tags=["Tool Playground Requests for Logged-in Users"])