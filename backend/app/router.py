# コントローラー層：URLの窓口を整理する（URLを受け取り、サービスに仕事を振る「受付」）

from fastapi import APIRouter, Depends
from schemas import WeatherReportCreate
from services import WeatherService
# main.pyからdbをインポート（後ほど調整）
from database import db 

router = APIRouter(prefix="/api/weather-reports", tags=["Weather Reports"])

def get_service():
    return WeatherService(db)

@app_router := APIRouter() # routerの定義

@router.post("")
async def create(data: WeatherReportCreate, service: WeatherService = Depends(get_service)):
    return await service.create_report(data, user_id=1)

@router.get("/me")
async def get_me(service: WeatherService = Depends(get_service)):
    return await service.get_user_reports()

@router.delete("/{report_id}")
async def delete(report_id: int, service: WeatherService = Depends(get_service)):
    await service.delete_report(report_id)
    return {"message": "deleted"}