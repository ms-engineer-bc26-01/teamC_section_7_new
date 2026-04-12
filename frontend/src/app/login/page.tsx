"use client";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex items-center justify-center bg-sky-50">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">ログイン</h1>

        <form
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();

            const formData = new FormData(e.currentTarget);
            const email = formData.get("email");
            const password = formData.get("password");

            try {
              const userCredential = await signInWithEmailAndPassword(
                auth,
                email as string,
                password as string
              );

              console.log("ログイン成功", userCredential.user);
              router.push("/home");
            } catch (error) {
              console.error("ログイン失敗", error);
              alert("ログイン失敗！");
            }
          }}
        >
          <input
            type="email"
            name="email"
            placeholder="メールアドレス"
            className="w-full border p-3 rounded"
          />

          <input
            type="password"
            name="password"
            placeholder="パスワード"
            className="w-full border p-3 rounded"
          />

          <button
            type="submit"
            className="w-full bg-sky-500 text-white py-3 rounded"
          >
            ログイン
          </button>
        </form>
      </div>
    </main>
  );
}
