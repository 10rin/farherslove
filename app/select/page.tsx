"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { DRINKS, Drink } from "../data/drinks";

interface SavedDrink {
  id: string;
  name: string;
  type: string;
  image: string;
  message: string;
  isHandwritten: boolean;
}

interface ParentData {
  fatherName: string;
  childName: string;
  drinks: SavedDrink[];
}

export default function ChildSelect() {
  const [parentData, setParentData] = useState<ParentData | null>(null);
  const [selectedFavorite, setSelectedFavorite] = useState<SavedDrink | null>(null);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("19-21");
  const [isOrdered, setIsOrdered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);

  useEffect(() => {
    // Check if token exists in query parameters (simulating token validation)
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    
    if (token) {
      setTokenValid(true);
    }

    // Load custom data from parent setup, or use fallback demo data
    const rawData = localStorage.getItem("farherslove_parentData");
    if (rawData) {
      try {
        const parsed = JSON.parse(rawData) as ParentData;
        setParentData(parsed);
      } catch (e) {
        console.error("Failed to parse parent data, using default demo data", e);
        loadDefaultDemoData();
      }
    } else {
      loadDefaultDemoData();
    }
    setLoading(false);
  }, []);

  const loadDefaultDemoData = () => {
    const defaultData: ParentData = {
      fatherName: "隆 (たかし)",
      childName: "健太",
      drinks: [
        {
          id: "sake",
          name: "天麟 (てんりん)",
          type: "日本酒 (純米大吟醸)",
          image: "/images/sake.jpg",
          message: "俺が若い頃に一番飲んだ日本酒だ。お前ももうこういう味がわかる歳か。",
          isHandwritten: true
        },
        {
          id: "whisky",
          name: "光 (ひかり)",
          type: "シングルモルトウイスキー",
          image: "/images/whisky.jpg",
          message: "社会人になって初めて買った良いウイスキー。ちびちびやってくれ。",
          isHandwritten: false
        },
        {
          id: "umeshu",
          name: "大和 特選梅酒",
          type: "本格梅酒 (熟成 紀州南高梅)",
          image: "/images/umeshu.jpg",
          message: "お前の母親と昔よく行った居酒屋で出た梅酒だ。飲みやすくて旨いぞ。",
          isHandwritten: true
        }
      ]
    };
    setParentData(defaultData);
  };

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFavorite) {
      alert("一番お気に入りのお酒を選択してください。");
      return;
    }
    if (!deliveryDate) {
      alert("実家に届ける日時（帰省日）を選択してください。");
      return;
    }

    setIsOrdered(true);
    
    // In a real system, the token would be invalidated here
    // For demo purposes, we can write a state to localStorage
    localStorage.setItem("farherslove_tokenUsed", "true");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-[#FDFBF7] items-center justify-center font-sans text-sm text-[#242424]/60">
        読み込み中...
      </div>
    );
  }

  // Token Security safety check
  if (!tokenValid) {
    return (
      <div className="flex flex-col min-h-screen bg-[#FDFBF7] text-[#242424] px-6 py-12 items-center justify-center font-serif">
        <div className="max-w-md text-center space-y-6 fade-in">
          <h1 className="text-xl font-light text-red-800">無効なアクセスです</h1>
          <p className="text-xs md:text-sm font-sans text-[#242424]/60 leading-relaxed">
            QRコードの有効期限が切れているか、リンクが正しくありません。<br />
            最後のお酒に同梱されているパンフレットをご確認ください。
          </p>
          <div className="pt-4">
            <Link href="/?token=demo" className="text-xs font-sans text-[#1A2E40] underline tracking-wider">
              デモ用トークンを付けてトップに戻る
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const father = parentData?.fatherName || "お父さん";

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7] text-[#242424] px-4 py-12 md:py-20 font-serif">
      <div className="max-w-3xl mx-auto w-full fade-in">
        
        {!isOrdered ? (
          <>
            {/* Concept Header */}
            <div className="text-center mb-16 max-w-xl mx-auto">
              <span className="text-xs tracking-[0.2em] text-[#1A2E40]/60 font-sans mb-4 block">
                おかえりの準備
              </span>
              <h1 className="text-2xl md:text-3xl font-light tracking-[0.1em] mb-6">
                実家で一緒に飲む一本を選ぶ
              </h1>
              <p className="text-xs md:text-sm text-[#242424]/70 font-sans tracking-wide leading-relaxed">
                半年にわたるお酒の定期便はいかがでしたでしょうか。<br />
                これまで届いた3本の中で、一番気に入ったお酒を1つ選んでください。<br />
                あなたが実家に帰省する日に合わせて、そのお酒をもう一度実家に配送します。<br />
                実家には、初回配送時にしまわれた「もうひとつのグラス」が待っています。
              </p>
            </div>

            {/* Drink Selection */}
            <div className="space-y-6 mb-12">
              <h2 className="text-xs font-sans font-semibold tracking-widest text-[#242424]/50 uppercase border-b border-[#E8E2D5] pb-2">
                届いたお酒と{father}からのメッセージ
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {parentData?.drinks.map((drink) => {
                  const isSelected = selectedFavorite?.id === drink.id;
                  return (
                    <div
                      key={drink.id}
                      onClick={() => setSelectedFavorite(drink)}
                      className={`cursor-pointer rounded-lg bg-white border transition-all duration-300 overflow-hidden flex flex-col p-5 space-y-4 hover:-translate-y-0.5 hover:shadow-sm ${
                        isSelected 
                          ? "border-[#1A2E40] ring-1 ring-[#1A2E40]" 
                          : "border-[#E8E2D5] hover:border-[#1A2E40]/30"
                      }`}
                    >
                      {/* Product Image */}
                      <div className="relative w-full aspect-[4/5] bg-[#FAF6EE] rounded flex items-center justify-center p-3 border border-[#F1EFEA]">
                        <Image
                          src={drink.image}
                          alt={drink.name}
                          fill
                          className="object-contain p-1"
                        />
                      </div>

                      {/* Info & Message */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="text-center mb-4">
                          <h3 className="font-serif text-sm font-semibold">{drink.name}</h3>
                          <span className="text-[9px] text-[#242424]/50 font-sans block mt-1">{drink.type}</span>
                        </div>

                        {/* Father's Message Box (Quiet aesthetics) */}
                        <div className="bg-[#FAF6EE]/70 rounded p-3 border border-[#FAF6EE] flex-1 flex flex-col justify-center">
                          <span className="text-[8px] text-[#242424]/40 font-sans block mb-1">
                            {father}の一言 {drink.isHandwritten && "📷 (手書きスキャン)"}
                          </span>
                          <p className={`text-xs text-[#242424]/85 leading-relaxed text-center ${
                            drink.isHandwritten ? "italic font-light text-[#1A2E40]" : ""
                          }`}>
                            「 {drink.message || "お前と飲めるのを楽しみにしている。"} 」
                          </p>
                        </div>
                      </div>

                      {/* Selection indicator */}
                      <div className="pt-2 text-center">
                        <span className={`inline-block text-[10px] px-3 py-1 rounded-full font-sans tracking-wider ${
                          isSelected 
                            ? "bg-[#1A2E40] text-white" 
                            : "bg-[#FAF6EE] border border-[#E8E2D5] text-[#242424]/60"
                        }`}>
                          {isSelected ? "選択中" : "これを選ぶ"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Date Selection and Order Form */}
            {selectedFavorite && (
              <form onSubmit={handleOrder} className="bg-white p-6 md:p-8 rounded-lg shadow-sm border border-[#E8E2D5] space-y-6 font-sans fade-in max-w-xl mx-auto">
                <h3 className="text-sm font-serif font-semibold border-b border-[#E8E2D5] pb-3 tracking-wide text-[#1A2E40]">
                  帰省日の指定とお届け先
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-[#242424]/70 mb-2 tracking-wider">
                      実家に帰省する日（お届け日）
                    </label>
                    <input
                      type="date"
                      required
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      className="w-full bg-[#FDFBF7] border border-[#E8E2D5] rounded px-4 py-2.5 text-sm focus:outline-none focus:border-[#1A2E40]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-[#242424]/70 mb-2 tracking-wider">
                      お届け時間帯
                    </label>
                    <select
                      value={deliveryTime}
                      onChange={(e) => setDeliveryTime(e.target.value)}
                      className="w-full bg-[#FDFBF7] border border-[#E8E2D5] rounded px-4 py-2.5 text-sm focus:outline-none focus:border-[#1A2E40]"
                    >
                      <option value="am">午前中</option>
                      <option value="14-16">14:00 - 16:00</option>
                      <option value="16-18">16:00 - 18:00</option>
                      <option value="18-20">18:00 - 20:00</option>
                      <option value="19-21">19:00 - 21:00 (夜間おすすめ)</option>
                    </select>
                  </div>

                  <div className="bg-[#FAF6EE] p-4 rounded border border-[#E8E2D5] space-y-2 text-xs">
                    <p className="text-[#1A2E40] font-semibold">【自動判定されたお届け先】</p>
                    <p className="text-[#242424]/70">
                      {father}様のご登録住所（ご実家）：<br />
                      〒100-0001 東京都千代田区千代田 1-1（デモ住所）
                    </p>
                  </div>
                </div>

                <div className="text-center pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#1A2E40] text-[#FAF6EE] font-serif text-sm tracking-widest py-3.5 px-6 rounded shadow-sm hover:bg-[#1A2E40]/90 transition-all duration-300"
                  >
                    このお酒を実家に送る
                  </button>
                  <p className="text-[10px] text-[#242424]/40 mt-3">
                    ※お酒の代金は、事前のご契約プランに含まれているため追加の費用は発生しません。
                  </p>
                </div>
              </form>
            )}
          </>
        ) : (
          /* Checkout Completed Page */
          <div className="text-center space-y-8 max-w-md mx-auto">
            <div className="inline-flex w-12 h-12 rounded-full bg-[#1A2E40]/10 text-[#1A2E40] items-center justify-center text-xl">
              ✓
            </div>
            
            <div className="space-y-4">
              <h1 className="text-xl md:text-2xl font-light tracking-[0.1em]">
                お酒の手配が完了しました
              </h1>
              <p className="text-xs md:text-sm text-[#242424]/60 font-sans tracking-wide leading-relaxed">
                お選びいただいたお酒「{selectedFavorite?.name}」を、<br />
                帰省日の <span className="font-semibold text-[#1A2E40]">{deliveryDate}</span> に合わせて実家へお届けします。
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-[#E8E2D5] font-sans text-left space-y-4 shadow-sm">
              <h3 className="text-xs font-semibold text-[#1A2E40] border-b border-[#F1EFEA] pb-2 tracking-wider">
                実家で待つペアグラス
              </h3>
              <p className="text-xs text-[#242424]/80 leading-relaxed">
                初回の配送時に、お父さんの手元へ渡った「対になるグラス」が実家で待っています。<br />
                あなたが手元にあるグラスを持って帰省し、二つのグラスが揃ったとき、この贈りものは完成します。<br />
                久しぶりの帰省で、ゆっくりとした時間をお過ごしください。
              </p>
            </div>

            <div className="pt-6 font-sans space-y-4">
              <p className="text-[10px] text-red-600 bg-red-50 border border-red-100 p-2.5 rounded">
                ※セキュリティ上の仕様により、このQRコード（トークン）は一度確定されたため無効化（使用済み）になりました。
              </p>
              <Link href="/" className="text-xs text-[#1A2E40] underline tracking-wider block">
                トップに戻る
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
