"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HistoryPage() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const router = useRouter();

  const year = 2026;
  const month = 4;

  // 仮データ
  const data: Record<string, { mood: string; comment?: string }> = {
    "2026-04-10": { mood: "☀️", comment: "元気！" },
    "2026-04-11": { mood: "☁️" },
    "2026-04-12": { mood: "🌧️", comment: "雨で気分も低め…" },
  };

  const firstDay = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();

  const calendarDays = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const weekDays = ["日", "月", "火", "水", "木", "金", "土"];

  return (
    <main className="flex-1 flex items-center justify-center bg-gradient-to-br from-[#E6F7FF] via-white to-[#FFE4F1] relative overflow-hidden p-6">

      {/* 背景ぼかし */}
      <div className="absolute -top-24 -left-24 w-[32rem] h-[32rem] bg-[#A7E3FF]/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-[28rem] h-[28rem] bg-[#FFC1DD]/25 rounded-full blur-3xl" />

      {/* メインカード */}
      <div className="relative z-10 w-[900px] bg-white/90 backdrop-blur-xl rounded-[40px] p-12 shadow-lg">

        {/* 戻る */}
        <div className="mb-6">
          <button
            onClick={() => router.push("/home")}
            className="px-4 py-2 bg-white/80 backdrop-blur rounded-xl shadow-sm text-sky-500 hover:scale-105 transition-all"
          >
            ← もどる
          </button>
        </div>

        {/* タイトル */}
        <h1 className="text-3xl font-bold text-[#4BA3E3] text-center mb-8">
          📅 {year}年 {month}月
        </h1>

        {/* 曜日 */}
        <div className="grid grid-cols-7 mb-4 text-base text-gray-400 text-center">
          {weekDays.map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>

        {/* カレンダー */}
        <div className="grid grid-cols-7 gap-5">
          {calendarDays.map((day, index) => {
            if (!day) {
              return <div key={`empty-${index}`} />;
            }

            const date = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

            const hasData = !!data[date];
            const hasComment = !!data[date]?.comment;

            return (
              <button
                key={date}
                onClick={() => {
                  if (hasComment) setSelectedDate(date);
                }}
                disabled={!hasComment}
                className={`
                  h-28 rounded-3xl flex flex-col items-center justify-center
                  transition-all shadow-sm
                  ${hasData ? "bg-[#E6F7FF] hover:bg-[#D6F0FF] hover:scale-105" : "bg-[#F3F4F6] text-gray-300"}
                  ${!hasComment ? "cursor-not-allowed opacity-60" : ""}
                `}
              >
                {/* 日付 */}
                <span className="text-gray-500 text-base">{day}</span>

                {/* 天気 */}
                <span className="text-2xl mt-1">
                  {hasData ? data[date].mood : "・"}
                </span>

                {/* メモマーク */}
                {hasComment && (
                  <span className="text-sm mt-1 text-pink-400">💬</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* モーダル */}
      {selectedDate && (
        <div
          className="fixed inset-0 z-50 bg-black/20 flex items-center justify-center"
          onClick={() => setSelectedDate(null)}
        >
          <div
            className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 w-[340px] text-center shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 日付 */}
            <h2 className="text-lg font-bold text-[#4BA3E3] mb-4">
              {selectedDate}
            </h2>

            {/* 気持ち */}
            <div className="text-4xl mb-3">
              {data[selectedDate]?.mood}
            </div>

            {/* メモ */}
            <p className="text-xs text-gray-400 mb-1">ひとことメモ</p>
            <p className="text-gray-700">
              {data[selectedDate]?.comment}
            </p>

            {/* 閉じる */}
            <button
              onClick={() => setSelectedDate(null)}
              className="mt-6 px-6 py-2 bg-gradient-to-r from-[#00CFFF] to-[#7ADFFF] text-white rounded-xl shadow-md hover:scale-105 transition-all"
            >
              とじる
            </button>
          </div>
        </div>
      )}

    </main>
  );
}