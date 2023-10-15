from typing import Any
from datetime import datetime, timedelta
from random import randbytes, randint
import hashlib
import pyotp

from bson.objectid import ObjectId
from fastapi import APIRouter, Request, Response, status, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from fastapi_sso.sso.google import GoogleSSO
from fastapi_sso.sso.facebook import FacebookSSO
# from starlette.requests import Request
from starlette.responses import RedirectResponse

from pydantic import EmailStr

from config.config import settings
import models, schemas
from auth.auth import (
    authenticate_user,
    create_access_token,
    create_refresh_token,
    get_current_user,
    get_current_user_from_cookie,
)
import utils
from utils.userSerializers import userEntity

router = APIRouter()

#################################################################################################################
# Register new User - to be removed if webapp is private
@router.post('/register', status_code=status.HTTP_201_CREATED, response_model=schemas.UserResponseSchema)
async def register(
    credentials: schemas.UserRegisterSchema,
    request: Request):
    """
    Register a new user.
    """
    print("credentials: ", credentials)
    print(request.url.scheme, request.client.host, request.url.port)

    if not await utils.email_validate.is_valid_email(credentials.email):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='Invalid email'
        )
    print("email is valid !")

    email_exists = await models.UserDocument.find_one({"email": credentials.email.lower()})
    if email_exists:
        print('An account of the email already exists')
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail='An account of the email already exists'
        )

    new_user = models.UserDocument(
        first_name=credentials.first_name,
        last_name=credentials.last_name,
        email=credentials.email.lower(),
        hashed_password=utils.password.get_hashed_password(credentials.password),
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    await new_user.create()
    print('A new user of the email created !')

    try:
        code = randbytes(10)
        # code = randint(100000, 999999)
        hashedCode = hashlib.sha256()
        hashedCode.update(code)
        verification_code = hashedCode.hexdigest()

        new_user.email_verification_code = verification_code
        new_user.updated_at = datetime.utcnow()
        await new_user.save()


        url = f"{request.url.scheme}://{request.client.host}:{request.url.port}/api/v1/verify_email/{code.hex()}"
        print("HERE")
        await utils.send_email.Email(userEntity(new_user), url, [credentials.email.lower(), ]).sendVerificationCode()

    except Exception as error:
        print(error)
        new_user.email_verification_code = None
        new_user.updated_at = datetime.utcnow()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail='There was an error sending email')
    
    return {'status': 'success', 
            'message': 'Verification token successfully sent to your email'
            }


@router.get('/verify_email/{verificationCode}')
async def verify_me(verificationCode: str):
    hashedCode = hashlib.sha256()
    hashedCode.update(bytes.fromhex(verificationCode))
    verification_code = hashedCode.hexdigest()

    r_user: models.UserDocument = models.UserDocument.find_one({"email_verification_code": verification_code})

    if not r_user or r_user.email_verified:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail='Invalid verification code or account already verified')
    
    r_user.email_verification_code = None
    r_user.email_verified = True
    r_user.updated_at = datetime.utcnow()
    await r_user.save()
    
    return {
        "status": "success",
        "message": "Account verified successfully"
    }

#########################################################################################################
@router.post("/login/access-token", response_model=schemas.Token)
async def login_access_token(
    response: Response,
    login_data: schemas.UserLoginSchema
    ) -> Any:
    """
    OAuth2 compatible token login, get an access token for future requests.

    (!Completed)
    """
    # print(login_data)
    user = await authenticate_user(login_data.email.lower(), login_data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email and/or password")
    elif not user.is_active:
        raise HTTPException(status_code=401, detail="Inactive user")
    access_token = create_access_token(user.uuid)
    refresh_token = create_refresh_token(user.uuid)
    print(access_token)
    
    # Store refresh and access tokens in cookie
    response.set_cookie('access_token', access_token, 
                        settings.ACCESS_TOKEN_EXPIRES_IN_MINUTES * 60,
                        settings.ACCESS_TOKEN_EXPIRES_IN_MINUTES * 60, 
                        '/', None, False, True, 'lax')
    response.set_cookie('refresh_token', refresh_token,
                        settings.REFRESH_TOKEN_EXPIRES_IN_MINUTES * 60, 
                        settings.REFRESH_TOKEN_EXPIRES_IN_MINUTES * 60, 
                        '/', None, False, True, 'lax')
    response.set_cookie('logged_in', 'True', 
                        settings.ACCESS_TOKEN_EXPIRES_IN_MINUTES * 60,
                        settings.ACCESS_TOKEN_EXPIRES_IN_MINUTES * 60, 
                        '/', None, False, False, 'lax')

    return {
        "access_token": access_token,
        "token_type": "bearer",
    }


@router.get("/login/test-token", response_model=schemas.UserPrivateSchema)
async def test_token(
    current_user: models.UserDocument = Depends(get_current_user)
    ) -> Any:
    """
    Test access token
    """
    return current_user


@router.get("/login/refresh-token", response_model=schemas.Token)
async def refresh_token(
    response: Response, 
    current_user: models.UserDocument = Depends(get_current_user_from_cookie),
    ) -> Any:
    """
    Return a new token for current user
    """
    if not current_user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    access_token = create_access_token(
        current_user.uuid
    )
    response.set_cookie('access_token', access_token, 
                        settings.ACCESS_TOKEN_EXPIRES_IN_MINUTES * 60,
                        settings.ACCESS_TOKEN_EXPIRES_IN_MINUTES * 60, 
                        '/', None, False, True, 'lax')
    response.set_cookie('logged_in', 'True', 
                        settings.ACCESS_TOKEN_EXPIRES_IN_MINUTES * 60,
                        settings.ACCESS_TOKEN_EXPIRES_IN_MINUTES * 60, 
                        '/', None, False, False, 'lax')

    return {
        "access_token": access_token,
        "token_type": "bearer",
    }


@router.get('/logout', status_code=status.HTTP_200_OK)
def logout(
    response: Response, 
    current_user: str = Depends(get_current_user)
    ):
    # Authorize.unset_jwt_cookies()
    response.set_cookie('logged_in', '', -1)

    return {'status': 'success'}



#########################################################################################################

@router.post('/otp/generate')
async def Generate_OTP(payload: schemas.UserRequestSchema):
    otp_base32 = pyotp.random_base32()
    otp_auth_url = pyotp.totp.TOTP(otp_base32).provisioning_uri(
        name="sanhyew.ng@adamoai.com", issuer_name="adamoai.com")

    if not ObjectId.is_valid(payload.user_uuid):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail=f"Invalid id: {payload.user_uuid}")
    
    r_user: models.UserDocument = models.UserDocument.find_one({"uuid": payload.user_uuid})
    if not r_user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f'No user with this id: {payload.user_uuid} found')
    
    r_user.otp_auth_url = otp_auth_url
    r_user.otp_base32 = otp_base32
    await r_user.save()

    return {'base32': otp_base32, "otpauth_url": otp_auth_url}


@router.post('/otp/verify')
async def Verify_OTP(payload: schemas.UserRequestSchema):
    message = "Token is invalid or user doesn't exist"
    user_doc: models.UserDocument = models.UserDocument.find_one({"uuid": payload.user_uuid})
    if not user_doc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail=message)
    totp = pyotp.TOTP(user_doc.otp_base32)
    if not totp.verify(payload.token):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail=message)
    user_doc.otp_enabled = True
    user_doc.otp_verified = True
    await user_doc.save()
    
    return {'otp_verified': True, "user": userEntity(user_doc)}


@router.post('/otp/validate')
def Validate_OTP(payload: schemas.UserRequestSchema):
    message = "Token is invalid or user doesn't exist"
    user_doc: models.UserDocument = models.UserDocument.find_one({"uuid": payload.user_uuid})
    if not user_doc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail=message)

    if not user_doc.otp_verified:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="OTP must be verified first")

    totp = pyotp.TOTP(user_doc.otp_base32)
    if not totp.verify(otp=payload.token, valid_window=1):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail=message)

    return {'otp_valid': True}


@router.post('/otp/disable')
async def Disable_OTP(payload: schemas.UserRequestSchema):
    if not ObjectId.is_valid(payload.user_uuid):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail=f"Invalid id: {payload.user_uuid}")

    user_doc: models.UserDocument = models.UserDocument.find_one({"uuid": payload.user_uuid})
    if not user_doc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f'No user with this id: {payload.user_uuid} found')
    user_doc.otp_enabled = False
    await user_doc.save()

    return {'otp_disabled': True, 'user': userEntity(user_doc)}

####################################################################################################
google_sso = (
    GoogleSSO(
        settings.GOOGLE_CLIENT_ID,
        settings.GOOGLE_CLIENT_SECRET,
        f"{settings.SSO_CALLBACK_HOSTNAME}{settings.API_VERSION_STR}/login/google/callback",
    )
    if settings.GOOGLE_CLIENT_ID is not None
    and settings.GOOGLE_CLIENT_SECRET is not None
    else None
)

facebook_sso = (
    FacebookSSO(
        settings.FACEBOOK_CLIENT_ID,
        settings.FACEBOOK_CLIENT_SECRET,
        f"{settings.SSO_CALLBACK_HOSTNAME}{settings.API_VERSION_STR}/login/facebook/callback",
    )
    if settings.FACEBOOK_CLIENT_ID is not None
    and settings.FACEBOOK_CLIENT_SECRET is not None
    else None
)


@router.get("/login/google")
async def google_login():
    """
    Generate login url and redirect
    """
    return await google_sso.get_login_redirect()


@router.get("/login/google/callback")
async def google_callback(request: Request):
    """
    Process login response from Google and return user info
    """
    # Get user details from Google
    google_user = await google_sso.verify_and_process(request)

    # Check if user is already created in DB
    user_doc = await models.UserDocument.find_one({"email": google_user.email})
    if user_doc is None:
        # If user does not exist, create it in DB
        user_doc = models.User(
            email=google_user.email,
            first_name=google_user.first_name,
            last_name=google_user.last_name,
            picture=google_user.picture,
            provider=google_user.provider,
        )
        user_doc = await user_doc.create()

    if not user_doc.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")

    # Login user by creating access_token
    access_token = create_access_token(user_doc.uuid)
    response = RedirectResponse(settings.SSO_LOGIN_CALLBACK_URL)
    response.set_cookie(
        "Authorization",
        value=f"Bearer {access_token}",
        httponly=True,
        max_age=120,
        expires=120,
    )
    return response



