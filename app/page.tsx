"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!message.trim() || loading) return;

    setLoading(true);
    setReply("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "حدث خطأ");
      }

      setReply(data.reply);
    } catch (error) {
      setReply(
        error instanceof Error
          ? error.message
          : "حدث خطأ أثناء الاتصال بالذكاء الاصطناعي"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0b0d12] text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white font-bold text-black">
              N
            </div>

            <span className="text-xl font-semibold">Naba AI</span>
          </div>

          <button className="rounded-xl border border-white/10 px-4 py-2 text-sm text-gray-300 hover:bg-white/5">
            تسجيل الدخول
          </button>
        </div>
      </header>

      <section className="mx-auto flex min-h-[calc(100vh-64px)] max-w-4xl flex-col px-4">
        <div className="flex flex-1 flex-col items-center justify-center pb-32">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-2xl font-bold text-black">
            N
          </div>

          <h1 className="text-center text-4xl font-bold sm:text-5xl">
            كيف يمكنني مساعدتك؟
          </h1>

          <p className="mt-4 max-w-xl text-center text-gray-400">
            مرحبًا بك في Naba AI. اسأل، تعلّم، وحلّ مشاكلك باستخدام الذكاء
            الاصطناعي.
          </p>

          {reply && (
            <div className="mt-10 w-full max-w-2xl rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="mb-3 text-sm font-semibold text-gray-400">
                Naba AI
              </div>

              <div className="whitespace-pre-wrap leading-7 text-gray-100">
                {reply}
              </div>
            </div>
          )}

          {loading && (
            <div className="mt-10 text-sm text-gray-400">
              Naba AI يفكر...
            </div>
          )}
        </div>

        <div className="sticky bottom-4 pb-4">
          <div className="rounded-3xl border border-white/10 bg-[#14171e] p-2 shadow-2xl">
            <div className="flex items-end gap-2">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="اكتب رسالتك إلى Naba AI..."
                rows={1}
                className="max-h-40 min-h-12 flex-1 resize-none bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500"
              />

              <button
                onClick={sendMessage}
                disabled={loading || !message.trim()}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-black transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="إرسال"
              >
                ↑
              </button>
            </div>
          </div>

          <p className="mt-2 text-center text-xs text-gray-600">
            Naba AI قد يخطئ. تحقق من المعلومات المهمة.
          </p>
        </div>
      </section>
    </main>
  );
}