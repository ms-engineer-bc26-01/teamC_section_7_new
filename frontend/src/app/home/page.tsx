"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex items-center justify-center 
      bg-gradient-to-br from-[#E6F7FF] via-white to-[#FFE4F1] 
      relative overflow-hidden p-4">

      {/* 背景ぼかし */}
      <div className="absolute -top-24 -left-24 w-[32rem] h-[32rem] 
        bg-[#A7E3FF]/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-[28rem] h-[28rem] 
        bg-[#FFC1DD]/25 rounded-full blur-3xl" />

      {/* メインカード */}
      <div className="relative z-10 w-[640px] 
        bg-white/90 backdrop-blur-xl 
        rounded-[40px] p-12 text-center
        shadow-xl ring-1 ring-white/50
        transition-all duration-500">

        {/* タイトル */}
        <h1 className="text-3xl font-bold text-[#4BA3E3] mb-3 tracking-wide">
          ☁️ こころの天気
        </h1>

        <p className="text-gray-500 mb-10 text-sm">
          なにをする？
        </p>

        {/* 選択カード */}
        <div className="grid grid-cols-2 gap-6">

          {/* 記録する */}
          <button
            onClick={() => router.push("/record")}
            className="group cursor-pointer
              bg-[#F7FDFF] border border-[#E6F6FF]
              rounded-3xl p-8
              transition-all duration-300 ease-out
              shadow-sm
              hover:shadow-lg hover:-translate-y-1 hover:scale-[1.03]
              active:scale-95"
          >
            <div className="text-4xl mb-3 transition-transform duration-300 group-hover:scale-110">
              ☀️
            </div>

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
            className="group cursor-pointer
              bg-[#FFF7FB] border border-[#FFE3F1]
              rounded-3xl p-8
              transition-all duration-300 ease-out
              shadow-sm
              hover:shadow-lg hover:-translate-y-1 hover:scale-[1.03]
              active:scale-95"
          >
            <div className="text-4xl mb-3 transition-transform duration-300 group-hover:scale-110">
              📖
            </div>

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