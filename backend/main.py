from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

import firebase_admin
from firebase_admin import credentials, auth

if not firebase_admin._apps:
    cred = credentials.Certificate("./serviceAccountKey.json")
    firebase_admin.initialize_app(cred)

app = FastAPI()
EXCLUDE_PATHS = {
    "/docs",
    "/openapi.json",
    "/redoc",
    "/api/auth/login",
}

@app.middleware("http")
async def verify_firebase_token(request: Request, call_next):
    path = request.url.path

    if path in EXCLUDE_PATHS:
        return await call_next(request)

    auth_header = request.headers.get("Authorization")

    if not auth_header or not auth_header.startswith("Bearer "):
        return JSONResponse(
            status_code=401,
            content={"message": "未ログイン"},
        )

    id_token = auth_header.split("Bearer ")[1]

    try:
        decoded_token = auth.verify_id_token(id_token)
        request.state.firebase_uid = decoded_token.get("uid")
        request.state.firebase_email = decoded_token.get("email")
    except Exception:
        return JSONResponse(
            status_code=401,
            content={"message": "無効なトークンです"},
        )

    return await call_next(request)

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI!"}

@app.get("/api/auth/me")
async def get_me(request: Request):
    return {
        "message": "OK",
        "uid": request.state.firebase_uid,
        "email": request.state.firebase_email,
    }
