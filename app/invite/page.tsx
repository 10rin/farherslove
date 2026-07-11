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

export default function ChildInvite() {
  const [parentData, setParentData] = useState<ParentData | null>(null);
  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [isAccepted, setIsAccepted] = useState(false);
  const [isAdult, setIsAdult] = useState<boolean | null>(null);

  useEffect(() => {
    const rawData = localStorage.getItem("farherslove_parentData");
    if (rawData) {
      try {
        const parsed = JSON.parse(rawData) as ParentData;
        setParentData(parsed);
      } catch (e) {
        console.error("Failed to parse parent data", e);
      }
    }
  }, []);

  const handleAccept = (e: React.FormEvent) => {
    e.preventDefault();

    if (!birthYear || !birthMonth || !birthDay) {
      alert("生年月日を入力してください。");
      return;
    }

    const birthDate = new Date(parseInt(birthYear), parseInt(birthMonth) - 1, parseInt(birthDay));
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 20) {
      setIsAdult(false);
      alert("お酒の提供は20歳以上の方に限られます。");
      return;
    }

    setIsAdult(true);
    setIsAccepted(true);

    // Save accepting status to local storage for the next step of the demo
    localStorage.setItem("farherslove_childAccepted", "true");
  };

  const father = parentData?.fatherName || "お父さん";
  const child = parentData?.childName || "あなた";

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7] text-[#242424] px-6 py-12 md:py-24 font-serif">
      <main className="flex-1 max-w-md mx-auto flex flex-col justify-center w-full fade-in">
        
        {!isAccepted ? (
          <>
            {/* Header Text */}
            <div className="text-center mb-10">
              <span className="text-xs tracking-[0.2em] text-[#1A2E40]/60 font-sans mb-4 block">
                おくり酒 の招待
              </span>
              <h1 className="text-xl md:text-2xl font-light tracking-[0.05em] leading-relaxed">
                {father}さんから、<br />
                お酒の定期便が届いています。
              </h1>
              <p className="text-xs text-[#242424]/50 font-sans mt-4 tracking-wide leading-relaxed">
                アカウント作成は不要です。{child}さんの年齢確認のみで、<br />
                2ヶ月に1回、お酒と特製グラスが届くようになります。
              </p>
            </div>

            {/* Verification Form */}
            <form onSubmit={handleAccept} className="bg-white p-6 md:p-8 rounded-lg shadow-sm border border-[#E8E2D5] space-y-6 font-sans">
              <div>
                <label className="block text-xs text-[#242424]/70 mb-3 tracking-wider text-center">
                  生年月日を入力してください（20歳以上の年齢確認）
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      required
                      placeholder="1998"
                      value={birthYear}
                      onChange={(e) => setBirthYear(e.target.value)}
                      className="w-full bg-[#FDFBF7] border border-[#E8E2D5] rounded px-2 py-2 text-center text-sm focus:outline-none focus:border-[#1A2E40] font-mono"
                    />
                    <span className="text-xs text-[#242424]/60">年</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      required
                      placeholder="4"
                      min={1}
                      max={12}
                      value={birthMonth}
                      onChange={(e) => setBirthMonth(e.target.value)}
                      className="w-full bg-[#FDFBF7] border border-[#E8E2D5] rounded px-2 py-2 text-center text-sm focus:outline-none focus:border-[#1A2E40] font-mono"
                    />
                    <span className="text-xs text-[#242424]/60">月</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      required
                      placeholder="1"
                      min={1}
                      max={31}
                      value={birthDay}
                      onChange={(e) => setBirthDay(e.target.value)}
                      className="w-full bg-[#FDFBF7] border border-[#E8E2D5] rounded px-2 py-2 text-center text-sm focus:outline-none focus:border-[#1A2E40] font-mono"
                    />
                    <span className="text-xs text-[#242424]/60">日</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#1A2E40] text-[#FAF6EE] font-serif text-sm py-3.5 px-4 rounded tracking-widest hover:bg-[#1A2E40]/90 transition-colors shadow-sm"
              >
                お酒を受け取る
              </button>
            </form>
          </>
        ) : (
          /* Onboarding Success Page */
          <div className="text-center space-y-8">
            <div className="inline-flex w-12 h-12 rounded-full bg-[#1A2E40]/10 text-[#1A2E40] items-center justify-center text-xl">
              ✓
            </div>
            
            <div className="space-y-4">
              <h1 className="text-xl md:text-2xl font-light tracking-[0.1em]">
                受け取り設定が完了しました
              </h1>
              <p className="text-xs md:text-sm text-[#242424]/60 font-sans tracking-wide leading-relaxed">
                お父さんからの定期便の受け取りを承認しました。<br />
                2ヶ月に1回、合計3回お届けします。<br />
                初回のお酒は2〜3日以内に出荷されます。
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-[#E8E2D5] font-sans text-left space-y-4 max-w-sm mx-auto shadow-sm">
              <h3 className="text-xs font-semibold text-[#1A2E40] border-b border-[#F1EFEA] pb-2 tracking-wider">
                物理的に届くもの（お酒と器）
              </h3>
              <p className="text-xs text-[#242424]/80 leading-relaxed">
                初回にはお酒と一緒に、お父さん用とあなた用、対になる「特製グラス」が届きます。<br />
                自分のグラスは手元に置き、もう一つのグラスは実家に大切にしまわれます。
              </p>
            </div>

            <div className="pt-6 font-sans space-y-4">
              {/* Button to simulate the next step in the flow */}
              <Link
                href="/select?token=demo"
                className="w-full bg-[#1A2E40] text-[#FAF6EE] text-center text-xs py-3.5 px-4 rounded font-serif tracking-wider hover:bg-[#1A2E40]/90 transition-colors block shadow-sm"
              >
                デモの次へ：3回目のお酒（パンフレットQR）を開く
              </Link>
              
              <Link href="/" className="text-xs text-[#242424]/50 underline tracking-wider block">
                トップに戻る
              </Link>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
