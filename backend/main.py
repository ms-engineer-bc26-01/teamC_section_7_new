from fastapi import FastAPI, HTTPException
from prisma import Prisma
from contextlib import asynccontextmanager
from pydantic import BaseModel # バリデーション用
from typing import List, Optional

# ==========================================
# 1. バリデーション層 (Schemas)
# フロントエンドとの「データの形」の約束
# ==========================================
class WeatherReportCreate(BaseModel):
    condition: str  # "sunny", "cloudy", "rainy"
    comment: Optional[str] = None

class WeatherReportResponse(BaseModel):
    id: int
    condition: str
    comment: Optional[str]
    authorId: int
    # createdAt: datetime # 必要に応じて追加

# ==========================================
# 2. データベース接続設定
# ==========================================
db = Prisma()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # アプリ起動時にDBに接続
    await db.connect()
    yield
    # アプリ終了時にDBを切断
    await db.disconnect()

# lifespanを適用してFastAPIを初期化
app = FastAPI(title="こころの天気 API", lifespan=lifespan)

# ==========================================
# 3. サービス層 (Services)
# DB操作のロジックをまとめる（中身をスッキリさせるため）
# ==========================================
class WeatherService:
    @staticmethod
    async def create(data: WeatherReportCreate, user_id: int):
        return await db.weatherreport.create(
            data={
                "condition": data.condition,
                "comment": data.comment,
                "authorId": user_id
            }
        )

    @staticmethod
    async def get_all_by_user():
        return await db.weatherreport.find_many(
            order={"createdAt": "desc"}
        )

    @staticmethod
    async def delete(report_id: int):
        return await db.weatherreport.delete(
            where={"id": report_id}
        )

# ==========================================
# 4. コントローラー層 (Routes)
# URLの窓口。サービス層を呼び出すだけにする
# ==========================================

# --- 共通（認証） ---
@app.post("/api/auth/login", tags=["Auth"])
async def login():
    return {"message": "login"}

@app.post("/api/auth/logout", tags=["Auth"])
async def logout():
    return {"message": "logout"}

@app.get("/api/auth/me", tags=["Auth"])
async def get_me():
    return {"id": 1, "name": "Arai (Test User)", "role": "student"}

# --- 児童用（お天気記録） ---
@app.post("/api/weather-reports", tags=["Weather Reports"])
async def create_report(report_data: WeatherReportCreate):
    # ★サービス層を呼び出し、フロントから届いたデータ(report_data)を渡す
    new_report = await WeatherService.create(report_data, user_id=1)
    return {"message": "記録をDBに保存しました", "data": new_report}

@app.get("/api/weather-reports/me", response_model=List[WeatherReportResponse], tags=["Weather Reports"])
async def get_my_reports():
    # ★サービス層を使ってDBから取得
    return await WeatherService.get_all_by_user()

@app.delete("/api/weather-reports/{report_id}", tags=["Weather Reports"])
async def delete_report(report_id: int):
    # ★サービス層を使って削除
    try:
        await WeatherService.delete(report_id)
        return {"message": f"記録 {report_id} をDBから削除しました"}
    except Exception:
        raise HTTPException(status_code=404, detail="指定された記録が見つかりません")