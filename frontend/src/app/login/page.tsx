"use client";

import React from "react";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#E6F7FF] via-white to-[#FFE4F1] relative overflow-hidden p-4">

      {/* 背景ぼかし */}
      <div className="absolute -top-24 -left-24 w-[32rem] h-[32rem] bg-[#A7E3FF]/20 rounded-full blur-3xl select-none" />
      <div className="absolute -bottom-24 -right-24 w-[28rem] h-[28rem] bg-[#FFC1DD]/25 rounded-full blur-3xl select-none" />

      {/* メイン */}
      <div className="relative z-10 drop-shadow-[0_25px_60px_rgba(167,227,255,0.35)] sm:scale-110 transition-all">

        {/* 楕円カード */}
        <div
          className="w-[720px] h-[500px] bg-white/90 backdrop-blur-xl rounded-[380px/260px]
                     flex items-center justify-center px-24 border border-white/60
                     shadow-[inset_0_0_25px_rgba(255,255,255,0.8)]"
        >

          {/* フォーム */}
          <div className="w-full max-w-[320px] text-center">

            {/* タイトル */}
            <div className="mb-6">
              <h1 className="text-[34px] font-bold text-[#4BA3E3] tracking-wide">
                ☁️ こころの天気
              </h1>

              <div className="h-[3px] w-16 bg-[#BFE9FF] mx-auto mt-3 rounded-full opacity-80" />
            </div>

            {/* サブタイトル */}
            <p className="text-gray-400 text-sm mb-10 tracking-wide">
              今日の気持ちを教えてね 🌈
            </p>

            {/* フォーム */}
            <div className="space-y-5">

              {/* メール */}
              <input
                type="email"
                placeholder="メールアドレス"
                className="w-full px-6 py-4 bg-[#F7FDFF] border border-[#E6F6FF]
                           rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#A7E3FF]
                           transition-all placeholder:text-[#C7CDD3]
                           text-sky-800 shadow-inner text-base
                           hover:bg-white"
              />

              {/* パスワード */}
              <input
                type="password"
                placeholder="パスワード"
                className="w-full px-6 py-4 bg-[#F7FDFF] border border-[#E6F6FF]
                           rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#A7E3FF]
                           transition-all placeholder:text-[#C7CDD3]
                           text-sky-800 shadow-inner text-base
                           hover:bg-white"
              />

              {/* ボタン */}
              <button
                className="w-full py-4 bg-gradient-to-r from-[#00CFFF] to-[#7ADFFF]
                           text-white font-bold rounded-2xl
                           hover:scale-[1.05] active:scale-[0.96]
                           transition-all shadow-lg shadow-sky-200
                           mt-6 text-lg tracking-widest"
              >
                ログインする ☀️
              </button>

            </div>
          </div>
        </div>
      </div>

      {/* キラキラ */}
      <div className="absolute bottom-10 right-10 text-white opacity-40 text-4xl select-none animate-pulse">
        ✦
      </div>

    </main>
  );
}
