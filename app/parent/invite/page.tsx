"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface SavedDrink {
  id: string;
  name: string;
  type: string;
  image: string;
}

interface ParentData {
  fatherName: string;
  childName: string;
  drinks: SavedDrink[];
}

export default function ParentInvite() {
  const [parentData, setParentData] = useState<ParentData | null>(null);
  const [inviteUrl, setInviteUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Retrieve parent setup data
    const rawData = localStorage.getItem("farherslove_parentData");
    if (rawData) {
      try {
        const parsed = JSON.parse(rawData) as ParentData;
        setParentData(parsed);
      } catch (e) {
        console.error("Failed to parse parent data", e);
      }
    }

    // Create the invite URL pointing to the child onboarding page
    const origin = window.location.origin;
    // We add a mock parameter representing a unique relationship token
    const url = `${origin}/invite?token=demo-token-123`;
    setInviteUrl(url);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lineShareUrl = parentData
    ? `https://line.me/R/msg/text/?${encodeURIComponent(
        `${parentData.fatherName}（お父さん）から、お酒の定期便の招待が届いています。こちらのリンクから受け取り手続きを完了させてください。\n${inviteUrl}`
      )}`
    : "";

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7] text-[#242424] px-6 py-12 md:py-24 font-serif">
      <main className="flex-1 max-w-xl mx-auto flex flex-col justify-center w-full fade-in">
        
        {/* Success Icon/Concept */}
        <div className="text-center mb-10">
          <div className="inline-flex w-12 h-12 rounded-full bg-[#1A2E40]/10 text-[#1A2E40] items-center justify-center text-xl mb-6">
            ✓
          </div>
          <h1 className="text-2xl md:text-3xl font-light tracking-[0.1em] mb-4">お申し込みが完了しました</h1>
          <p className="text-xs md:text-sm text-[#242424]/60 font-sans tracking-wide leading-relaxed">
            半年プランの決済（テスト）とお酒の選定が完了しました。<br />
            次に、{parentData?.childName || "息子"}さんへ招待リンクを送ってください。
          </p>
        </div>

        {/* Invite Link Card */}
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm border border-[#E8E2D5] space-y-6 font-sans mb-10">
          <div>
            <label className="block text-[10px] text-[#242424]/60 uppercase tracking-widest mb-2 font-semibold">
              息子さん用の招待リンク
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                readOnly
                value={inviteUrl}
                className="flex-1 bg-[#FAF6EE] border border-[#E8E2D5] rounded px-3 py-2.5 text-xs text-[#242424]/80 focus:outline-none select-all font-mono"
              />
              <button
                type="button"
                onClick={handleCopyLink}
                className="bg-[#1A2E40] text-[#FAF6EE] text-xs py-2.5 px-4 rounded hover:bg-[#1A2E40]/90 transition-colors"
              >
                {copied ? "コピーしました" : "リンクをコピー"}
              </button>
            </div>
          </div>

          <div className="border-t border-[#F1EFEA] pt-6 flex flex-col gap-4">
            <a
              href={lineShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#06C755] text-white text-center text-xs py-3.5 px-4 rounded font-semibold tracking-wider hover:bg-[#05b04b] transition-colors block"
            >
              LINEで息子に送る
            </a>
            
            <Link
              href="/invite"
              className="w-full border border-[#1A2E40]/25 text-[#1A2E40] text-center text-xs py-3.5 px-4 rounded tracking-wider hover:bg-[#1A2E40]/5 transition-colors block"
            >
              自分で招待リンクを開く（体験する）
            </Link>
          </div>
        </div>

        {/* Small Note */}
        <div className="text-center font-sans">
          <p className="text-[10px] text-[#242424]/50 leading-relaxed max-w-sm mx-auto">
            ※父親が勝手にお酒を送りつけるのではなく、本人が承認することで配送が始まります。
            アカウント登録などは一切不要で、年齢確認のみで開始できます。
          </p>
          <div className="mt-8">
            <Link href="/" className="text-xs text-[#1A2E40] underline tracking-wider">
              トップページに戻る
            </Link>
          </div>
        </div>

      </main>
    </div>
  );
}
