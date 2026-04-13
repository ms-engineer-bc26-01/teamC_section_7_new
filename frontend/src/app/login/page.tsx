"use client";

export default function LoginPage() {
  return (
<<<<<<< Updated upstream
    <main className="min-h-screen flex items-center justify-center bg-sky-50">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          ログイン
        </h1>
=======
    // ① 全画面背景
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#E6F7FF] via-white to-[#FFE4F1] relative overflow-hidden  p-4">
>>>>>>> Stashed changes

        <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          
          const formData = new FormData(e.currentTarget);
          const email = formData.get("email");
          const password = formData.get("password");

          console.log("メール:", email);
          console.log("パスワード:", password);
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
