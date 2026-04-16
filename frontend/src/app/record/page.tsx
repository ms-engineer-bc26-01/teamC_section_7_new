"use client";

import { useState } from "react";

export default function RecordPage() {
  const [mood, setMood] = useState("");
  const [comment, setComment] = useState("");

  const moods = [
    { label: "晴れ", src: "/weather_sun.png" },
    { label: "くもり", src: "/weather_cloudy.png" },
    { label: "雨", src: "/weather_rain.png" },
    { label: "雷", src: "/weather_thunder.png" },
  ];

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#E6F7FF] via-white to-[#FFE4F1] relative overflow-hidden p-4">

      {/* 背景ぼかし */}
      <div className="absolute -top-24 -left-24 w-[32rem] h-[32rem] bg-[#A7E3FF]/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-[28rem] h-[28rem] bg-[#FFC1DD]/25 rounded-full blur-3xl" />

      {/* メイン */}
      <div className="relative z-10 drop-shadow-[0_25px_60px_rgba(167,227,255,0.35)] sm:scale-105 transition-all">

        {/* カード */}
        <div
          className="w-[780px] min-h-[560px] bg-white/90 backdrop-blur-xl
                     rounded-[40px] flex flex-col justify-center px-20 py-14
                     border border-white/60
                     shadow-[inset_0_0_25px_rgba(255,255,255,0.8)]"
        >

          {/* タイトル */}
          <div className="text-center mb-8">
            <h1 className="text-[32px] font-bold text-[#4BA3E3]">
              ☁️ こころの天気
            </h1>
            <p className="text-gray-400 mt-2">
              今日の気持ちを教えてね 🌈
            </p>
          </div>

          {/* こころの選ぶ */}
          <div className="mb-10 text-center">
            <p className="mb-4 font-medium text-gray-600">
              きょうの気分は？
            </p>

            <div className="flex justify-center gap-6">
              {moods.map((m) => (
                <button
                  key={m.label}
                  onClick={() => setMood(m.label)}
                  className={`p-4 rounded-2xl transition ${
                    mood === m.label
                      ? "bg-sky-200 scale-110"
                      : "bg-sky-50 hover:bg-sky-100 hover:scale-105"
                  }`}
                >
                  <img
                    src={m.src}
                    alt={m.label}
                    className="w-16 h-16 object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* メモ */}
          <div className="mb-10">
            <textarea
              placeholder="ひとことメモ（任意）✏️"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-6 py-4 bg-[#F7FDFF] border border-[#E6F6FF]
                         rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#A7E3FF]
                         text-sky-800 shadow-inner text-base"
              rows={4}
            />
          </div>

          {/* ボタン */}
          <button
            onClick={() => {
              console.log("気分:", mood);
              console.log("コメント:", comment);
            }}
            className="w-full py-4 bg-gradient-to-r from-[#00CFFF] to-[#7ADFFF]
                       text-white font-bold rounded-2xl
                       hover:scale-[1.04] active:scale-[0.96]
                       transition-all shadow-lg shadow-sky-200
                       text-lg tracking-widest"
          >
            記録する ☀️
          </button>

        </div>
      </div>

    </main>
  );
}