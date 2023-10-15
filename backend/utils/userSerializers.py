import models

def userEntity(user: models.UserDocument) -> dict:
    return {
        "uuid": str(user.uuid),
        "first_name": user.first_name,
        "last_name": user.last_name,
        "email": user.email,
        # "role": user["role"],
        "avatar": user.avatar,
        "email_verified": user.email_verified,
        "hashed_password": user.hashed_password,
        "created_at": user.created_at,
        "updated_at": user.updated_at,

        "otp_enabled": user.otp_enabled,
        "otp_verified": user.otp_verified,
        "otp_base32": user.otp_base32,
        "otp_auth_url": user.otp_auth_url,
    }



def userResponseEntity(user: models.UserDocument) -> dict:
    return {
        "uuid": str(user.uuid),
        "first_name": user.first_name,
        "last_name": user.last_name,
        "email": user.email,
        # "role": user["role"],
        "avatar": user.avatar,
        "created_at": user.created_at,
        "updated_at": user.updated_at
    }


def embeddedUserResponse(user: models.UserDocument) -> dict:
    return {
        "uuid": str(user.uuid),
        "first_name": user.first_name,
        "last_name": user.last_name,
        "email": user.email,
        "avatar": user.avatar
    }


def userListEntity(users) -> list:
    return [userEntity(user) for user in users]
