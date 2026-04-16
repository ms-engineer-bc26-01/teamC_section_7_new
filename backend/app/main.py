from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
from prisma.client import Prisma
from contextlib import asynccontextmanager
from pydantic import BaseModel
from typing import List, Optional
from .utils.logger import logger # ロガーを読み込み

# --- Schemas: データのバリデーション定義 ---

class WeatherReportCreate(BaseModel):
    """お天気記録の作成リクエスト"""
    condition: str  # "sunny", "cloudy", "rainy"
    comment: Optional[str] = None

class WeatherReportResponse(BaseModel):
    """フロントエンドへのレスポンス形式"""
    id: int
    condition: str
    comment: Optional[str]
    authorId: int

# --- Database: Prismaの接続管理 ---

db = Prisma()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # アプリ起動時にDB接続
    await db.connect()
    yield
    # アプリ終了時にDB切断
    await db.disconnect()

app = FastAPI(title="こころの天気 API", lifespan=lifespan)

# --- Middleware: グローバルエラーハンドリング ---

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """アプリ内で発生した全エラーをキャッチしてログに記録"""
    logger.error(f"Unhandled Exception: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={"error": "Internal Server Error", "message": "予期せぬエラーが発生しました"}
    )

# --- Services: DB操作のビジネスロジック ---

class WeatherService:
    @staticmethod
    async def create(data: WeatherReportCreate, user_id: int):
        """お天気記録をDBに新規保存"""
        return await db.weatherreport.create(
            data={
                "condition": data.condition,
                "comment": data.comment,
                "authorId": user_id
            }
        )

    @staticmethod
    async def get_all_by_user():
        """ユーザーの全記録を降順で取得"""
        return await db.weatherreport.find_many(
            order={"createdAt": "desc"}
        )

    @staticmethod
    async def delete(report_id: int):
        """ID指定で記録を削除"""
        return await db.weatherreport.delete(
            where={"id": report_id}
        )

# --- Routes: エンドポイント定義 ---

# Auth関連（現状はスタブ実装）
@app.post("/api/auth/login", tags=["Auth"])
async def login():
    return {"message": "login success"}

@app.get("/api/auth/me", tags=["Auth"])
async def get_me():
    return {"id": 1, "name": "Arai (Test User)", "role": "student"}

# Weather Reports関連
@app.post("/api/weather-reports", tags=["Weather Reports"])
async def create_report(report_data: WeatherReportCreate):
    """新しいお天気記録を投稿"""
    new_report = await WeatherService.create(report_data, user_id=1)
    return {"message": "Saved successfully", "data": new_report}

@app.get("/api/weather-reports/me", response_model=List[WeatherReportResponse], tags=["Weather Reports"])
async def get_my_reports():
    """ログインユーザーの記録一覧を取得"""
    return await WeatherService.get_all_by_user()

@app.delete("/api/weather-reports/{report_id}", tags=["Weather Reports"])
async def delete_report(report_id: int):
    """指定した記録を削除。失敗時は404を返す"""
    try:
        await WeatherService.delete(report_id)
        return {"message": f"Report {report_id} deleted"}
    except Exception as e:
        # 削除失敗時もロガーに記録
        logger.warning(f"Delete failed: {report_id} - {e}")
        raise HTTPException(status_code=404, detail="指定された記録が見つかりません")