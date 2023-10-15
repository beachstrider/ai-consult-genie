from datetime import datetime, timedelta
from typing import Any, Dict, Optional, Union
from uuid import UUID

from fastapi import Depends, HTTPException, Request, status
from fastapi.openapi.models import OAuthFlows as OAuthFlowsModel
from fastapi.security import OAuth2, OAuth2PasswordBearer
from fastapi.security.utils import get_authorization_scheme_param

import jwt
from utils.password import verify_password
import models, schemas
from config.config import settings


#################################################################################
async def authenticate_user(email: str, password: str):
    user = await models.UserDocument.find_one({"email": email})
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user


def create_access_token(
    user_uuid: UUID
):
    expires_delta = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRES_IN_MINUTES)
    expire = datetime.utcnow() + expires_delta
    payload = {
        "exp": expire,
        "iat": datetime.utcnow(),
        "sub": str(user_uuid),
    }

    encoded_jwt = jwt.encode(payload, settings.SECRET_KEY, algorithm=settings.HASH_ALGORITHM)
    return encoded_jwt

def create_refresh_token(
    user_uuid: UUID
):
    expires_delta = timedelta(minutes=settings.REFRESH_TOKEN_EXPIRES_IN_MINUTES)
    expire = datetime.utcnow() + expires_delta
    payload = {
        "exp": expire,
        "iat": datetime.utcnow(),
        "sub": str(user_uuid),
    }

    encoded_jwt = jwt.encode(payload, settings.SECRET_KEY, algorithm=settings.HASH_ALGORITHM)
    return encoded_jwt

#################################################################################
async def _get_current_user(token):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.HASH_ALGORITHM])
        user_uuid: UUID = payload["sub"]
        token_data = schemas.TokenPayload(uuid=user_uuid)
    except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=401, detail="Signature has expired")
    except jwt.InvalidTokenError as e:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    user = await models.UserDocument.find_one({"uuid": token_data.uuid})
    if user is None:
        raise credentials_exception
    
    return user


oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl=f"{settings.API_VERSION_STR}/login/access-token"
)
async def get_current_user(token: str = Depends(oauth2_scheme)):
    return await _get_current_user(token)


def get_current_active_user(
    current_user: models.UserDocument = Depends(get_current_user),
) -> models.UserDocument:
    if not current_user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


def get_current_manager(
    current_user: models.UserDocument = Depends(get_current_user),
) -> models.UserDocument:
    if not current_user.is_manager:
        raise HTTPException(
            status_code=400, detail="The user doesn't have enough privileges"
        )
    return current_user


def get_current_developer(
    current_user: models.UserDocument = Depends(get_current_user),
) -> models.UserDocument:
    if not current_user.is_developer:
        raise HTTPException(
            status_code=400, detail="The user doesn't have enough privileges"
        )
    return current_user

########################################################################################
class OAuth2PasswordBearerWithCookie(OAuth2):
    """
    Class used to get Authorization token from request HttpOnly cookie instead of
    header. Used to refresh token during SSO login process.
    """

    def __init__(
        self,
        tokenUrl: str,
        scheme_name: Optional[str] = None,
        scopes: Optional[Dict[str, str]] = None,
        description: Optional[str] = None,
        auto_error: bool = True,
    ):
        if not scopes:
            scopes = {}
        flows = OAuthFlowsModel(password={"tokenUrl": tokenUrl, "scopes": scopes})
        super().__init__(
            flows=flows,
            scheme_name=scheme_name,
            description=description,
            auto_error=auto_error,
        )

    async def __call__(self, request: Request) -> Optional[str]:
        authorization = request.cookies.get("Authorization")
        scheme, param = get_authorization_scheme_param(authorization)
        if not authorization or scheme.lower() != "bearer":
            if self.auto_error:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Not authenticated",
                    headers={"WWW-Authenticate": "Bearer"},
                )
            else:
                return None
        return param


oauth2_scheme_with_cookies = OAuth2PasswordBearerWithCookie(
    tokenUrl=f"{settings.API_VERSION_STR}/login/refresh-token"
)

async def get_current_user_from_cookie(
    token: str = Depends(oauth2_scheme_with_cookies),
):
    return await _get_current_user(token)


