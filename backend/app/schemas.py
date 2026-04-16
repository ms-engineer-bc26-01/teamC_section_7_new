# バリデーション：データの形を決める（フロントエンドとの「契約書」）

from pydantic import BaseModel

class WeatherReportCreate(BaseModel):
    condition: str  # "sunny", "cloudy", "rainy"
    comment: str | None = None

class WeatherReportResponse(BaseModel):
    id: int
    condition: str
    comment: str | None
    authorId: int

    class Config:
        from_attributes = True