from email_validator import validate_email, EmailNotValidError


async def is_valid_email(email: str):
    try:
        # Check that the email address is valid. Turn on check_deliverability
        # for first-time validations like on account creation pages (but not
        # login pages).
        emailinfo = validate_email(email.lower(), check_deliverability=False)
        # After this point, use only the normalized form of the email address,
        # especially before going to a database query.
        email = emailinfo.normalized
        return True
    
    except EmailNotValidError as e:
        # The exception message is human-readable explanation of why it's
        # not a valid (or deliverable) email address.
        print(str(e))
        return False

