from fastapi import HTTPException, status, Request

def require_role(allowed_roles: list):
    def role_checker(request: Request):
        user_role = getattr(request.state, "role", None)

        if user_role is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="ロール情報がありません"
            )

        if user_role not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="権限がありません"
            )

        return {
            "uid": getattr(request.state, "firebase_uid", None),
            "email": getattr(request.state, "firebase_email", None),
            "role": user_role,
        }

    return role_checker
    