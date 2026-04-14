# サービス層：DB操作のロジックを書く（DBを操作する「職人」の部屋）

from prisma import Prisma
from schemas import WeatherReportCreate

class WeatherService:
    def __init__(self, db: Prisma):
        self.db = db

    async def create_report(self, data: WeatherReportCreate, user_id: int):
        return await self.db.weatherreport.create(
            data={
                "condition": data.condition,
                "comment": data.comment,
                "authorId": user_id
            }
        )

    async def get_user_reports(self):
        return await self.db.weatherreport.find_many(
            order={"createdAt": "desc"}
        )

    async def delete_report(self, report_id: int):
        return await self.db.weatherreport.delete(where={"id": report_id})