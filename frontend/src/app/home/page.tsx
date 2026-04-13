"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#E6F7FF] via-white to-[#FFE4F1] relative overflow-hidden p-4">

      {/* 背景ぼかし */}
      <div className="absolute -top-24 -left-24 w-[32rem] h-[32rem] bg-[#A7E3FF]/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-[28rem] h-[28rem] bg-[#FFC1DD]/25 rounded-full blur-3xl" />

      {/* メインカード */}
      <div className="relative z-10 w-[640px] bg-white/90 backdrop-blur-xl rounded-[40px]
                      p-12 text-center shadow-lg
                      drop-shadow-[0_25px_60px_rgba(167,227,255,0.35)]">

        {/* タイトル */}
        <h1 className="text-3xl font-bold text-[#4BA3E3] mb-3">
          ☁️ こころの天気
        </h1>

        <p className="text-gray-500 mb-10">
          なにをする？
        </p>

        {/* 選択カード */}
        <div className="grid grid-cols-2 gap-6">

          {/* 記録する */}
          <button
            onClick={() => router.push("/record")}
            className="bg-[#F7FDFF] border border-[#E6F6FF]
                       rounded-3xl p-8
                       hover:scale-105 hover:bg-sky-50
                       transition-all shadow-sm"
          >
            <div className="text-4xl mb-3">☀️</div>
            <p className="text-lg font-bold text-sky-700">
              記録する
            </p>
            <p className="text-sm text-gray-400 mt-2">
              今日の気持ちを入力
            </p>
          </button>

          {/* 一覧を見る */}
          <button
            onClick={() => router.push("/history")}
            className="bg-[#FFF7FB] border border-[#FFE3F1]
                       rounded-3xl p-8
                       hover:scale-105 hover:bg-pink-50
                       transition-all shadow-sm"
          >
            <div className="text-4xl mb-3">📖</div>
            <p className="text-lg font-bold text-pink-600">
              一覧を見る
            </p>
            <p className="text-sm text-gray-400 mt-2">
              過去の記録をチェック
            </p>
          </button>

        </div>
      </div>

    </main>
  );
}