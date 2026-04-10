import asyncio
from prisma import Prisma

async def main() -> None:
    db = Prisma()
    await db.connect()

    # ID: 1 のユーザーがいなければ作成する（upsert = なければ作る）
    user = await db.user.upsert(
        where={'id': 1},
        data={
            'create': {
                'id': 1,
                'name': 'Arai',
                'role': 'student',
            },
            'update': {},
        },
    )
    print(f"Seed complete: Created user {user.name}")
    await db.disconnect()

if __name__ == '__main__':
    asyncio.run(main())