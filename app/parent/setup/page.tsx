"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { DRINKS, Drink } from "../../data/drinks";

export default function ParentSetup() {
  const router = useRouter();

  // Basic Info States
  const [fatherName, setFatherName] = useState("");
  const [childName, setChildName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");

  // Selected Drinks and Messages (3 slots)
  const [selectedDrinks, setSelectedDrinks] = useState<(Drink | null)[]>([null, null, null]);
  const [messages, setMessages] = useState<string[]>(["", "", ""]);
  const [isHandwritten, setIsHandwritten] = useState<boolean[]>([false, false, false]);

  // Search and filter state for drink selection modal
  const [activeSlot, setActiveSlot] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");

  const filteredDrinks = DRINKS.filter((drink) => {
    const matchesSearch = drink.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          drink.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || drink.type.includes(selectedType);
    return matchesSearch && matchesType;
  });

  const handleSelectDrink = (drink: Drink) => {
    if (activeSlot !== null) {
      const newSelected = [...selectedDrinks];
      newSelected[activeSlot] = drink;
      setSelectedDrinks(newSelected);
      setActiveSlot(null);
      setSearchQuery("");
    }
  };

  const handleRemoveDrink = (slotIndex: number) => {
    const newSelected = [...selectedDrinks];
    newSelected[slotIndex] = null;
    setSelectedDrinks(newSelected);
  };

  const handleMessageChange = (slotIndex: number, text: string) => {
    const newMessages = [...messages];
    newMessages[slotIndex] = text;
    setMessages(newMessages);
  };

  const toggleHandwrittenMock = (slotIndex: number) => {
    const newHandwritten = [...isHandwritten];
    newHandwritten[slotIndex] = !newHandwritten[slotIndex];
    
    // Auto-fill dummy text if turning on handwritten mock
    if (newHandwritten[slotIndex] && !messages[slotIndex]) {
      const dummyMessages = [
        "俺が若い頃に一番飲んだ日本酒だ。お前ももうこういう味がわかる歳か。",
        "社会人になって初めて買った良いウイスキー。ちびちびやってくれ。",
        "お前の母親と昔よく行った居酒屋で出た梅酒だ。飲みやすくて旨いぞ。"
      ];
      handleMessageChange(slotIndex, dummyMessages[slotIndex]);
    }
    
    setIsHandwritten(newHandwritten);
  };

  const handleSaveAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fatherName || !childName) {
      alert("お名前と子の名前を入力してください。");
      return;
    }

    if (selectedDrinks.some(drink => drink === null)) {
      alert("お酒を3本すべて選んでください。");
      return;
    }

    // Save to localStorage for demo data flow
    const parentData = {
      fatherName,
      childName,
      drinks: selectedDrinks.map((d, index) => ({
        id: d!.id,
        name: d!.name,
        type: d!.type,
        image: d!.image,
        message: messages[index],
        isHandwritten: isHandwritten[index]
      }))
    };

    localStorage.setItem("farherslove_parentData", JSON.stringify(parentData));
    router.push("/parent/invite");
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7] text-[#242424] px-4 py-12 md:py-20 font-serif">
      <div className="max-w-3xl mx-auto w-full fade-in">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-2xl md:text-3xl font-light tracking-[0.15em] mb-4">お酒の定期便を設定する</h1>
          <p className="text-xs md:text-sm text-[#242424]/60 font-sans tracking-wide">
            半年間、2ヶ月に1回（計3回）お酒とグラスを息子へ送るプランです。自動更新はありません。
          </p>
        </div>

        <form onSubmit={handleSaveAndSubmit} className="space-y-16">
          
          {/* Section 1: Basic Info */}
          <section className="bg-white p-6 md:p-8 rounded-lg shadow-sm border border-[#E8E2D5] space-y-6 font-sans">
            <h2 className="text-lg font-serif font-medium border-b border-[#E8E2D5] pb-3 tracking-wide text-[#1A2E40]">
              1. お届け情報・お名前
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs text-[#242424]/70 mb-2 tracking-wider">あなた（父親）のお名前</label>
                <input
                  type="text"
                  required
                  placeholder="例：山田 隆"
                  value={fatherName}
                  onChange={(e) => setFatherName(e.target.value)}
                  className="w-full bg-[#FDFBF7] border border-[#E8E2D5] rounded px-4 py-3 text-sm focus:outline-none focus:border-[#1A2E40] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs text-[#242424]/70 mb-2 tracking-wider">お届けするお子様（息子）のお名前</label>
                <input
                  type="text"
                  required
                  placeholder="例：山田 健太"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  className="w-full bg-[#FDFBF7] border border-[#E8E2D5] rounded px-4 py-3 text-sm focus:outline-none focus:border-[#1A2E40] transition-colors"
                />
              </div>
            </div>
          </section>

          {/* Section 2: Drink Selection & Message */}
          <section className="space-y-8">
            <div className="border-b border-[#E8E2D5] pb-3 flex justify-between items-baseline">
              <h2 className="text-lg font-serif font-medium tracking-wide text-[#1A2E40]">
                2. 送るお酒とメッセージの選択
              </h2>
              <span className="text-xs text-[#242424]/50 font-sans">計3本選択してください</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[0, 1, 2].map((slotIndex) => {
                const drink = selectedDrinks[slotIndex];
                return (
                  <div 
                    key={slotIndex} 
                    className="bg-white rounded-lg border border-[#E8E2D5] shadow-sm overflow-hidden flex flex-col min-h-[380px] transition-all hover:border-[#1A2E40]/30"
                  >
                    <div className="bg-[#FAF6EE] px-4 py-2 border-b border-[#E8E2D5] flex justify-between items-center font-sans text-xs">
                      <span className="font-semibold text-[#1A2E40] tracking-wider">{slotIndex + 1}本目</span>
                      {drink && (
                        <button 
                          type="button" 
                          onClick={() => handleRemoveDrink(slotIndex)}
                          className="text-[#242424]/50 hover:text-red-600 transition-colors"
                        >
                          変更
                        </button>
                      )}
                    </div>

                    {drink ? (
                      <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                        <div className="text-center flex-1 flex flex-col justify-center items-center">
                          <div className="relative w-24 h-32 mb-2">
                            <Image 
                              src={drink.image} 
                              alt={drink.name} 
                              fill 
                              className="object-contain"
                            />
                          </div>
                          <h3 className="font-serif text-sm font-medium tracking-wide">{drink.name}</h3>
                          <span className="text-[10px] text-[#242424]/50 font-sans mt-1">{drink.type}</span>
                        </div>
                        
                        <div className="font-sans space-y-3 pt-3 border-t border-[#F1EFEA]">
                          <label className="block text-[10px] text-[#242424]/60 tracking-wider">ボトルに添える一言</label>
                          <textarea
                            value={messages[slotIndex]}
                            onChange={(e) => handleMessageChange(slotIndex, e.target.value)}
                            placeholder="例：俺が若い頃に好きだった酒だ。"
                            className="w-full text-xs bg-[#FDFBF7] border border-[#E8E2D5] rounded p-2 h-16 focus:outline-none focus:border-[#1A2E40] resize-none"
                          />
                          
                          <button
                            type="button"
                            onClick={() => toggleHandwrittenMock(slotIndex)}
                            className={`w-full py-1.5 px-3 rounded text-[10px] tracking-wide transition-colors border ${
                              isHandwritten[slotIndex] 
                                ? "bg-[#1A2E40] border-[#1A2E40] text-white" 
                                : "border-[#E8E2D5] text-[#242424]/75 hover:bg-[#FAF6EE]"
                            }`}
                          >
                            {isHandwritten[slotIndex] ? "✓ 手書きスキャン適用中" : "📸 手書きメッセージをスキャンする"}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                        <div className="w-12 h-12 rounded-full bg-[#FAF6EE] flex items-center justify-center mb-3 text-lg border border-[#E8E2D5] text-[#1A2E40]">
                          ＋
                        </div>
                        <button
                          type="button"
                          onClick={() => setActiveSlot(slotIndex)}
                          className="font-sans text-xs text-[#1A2E40] underline tracking-wider hover:text-[#1A2E40]/80"
                        >
                          お酒を選択する
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section 3: Pricing & Stripe Payment */}
          <section className="bg-white p-6 md:p-8 rounded-lg shadow-sm border border-[#E8E2D5] space-y-6 font-sans">
            <h2 className="text-lg font-serif font-medium border-b border-[#E8E2D5] pb-3 tracking-wide text-[#1A2E40]">
              3. ご決済プラン（Stripe テスト環境）
            </h2>
            <div className="flex justify-between items-center bg-[#FAF6EE] p-4 rounded border border-[#E8E2D5] text-sm">
              <div>
                <span className="font-semibold block text-[#1A2E40]">半年間3本プラン</span>
                <span className="text-xs text-[#242424]/60">2ヶ月に1回配送・特製ペアグラスセット付</span>
              </div>
              <span className="text-base font-serif font-bold text-[#1A2E40]">9,800 円 <span className="text-xs font-normal text-[#242424]/70">(税込)</span></span>
            </div>

            {/* Dummy Credit Card Info */}
            <div className="space-y-4 pt-2">
              <div>
                <label className="block text-xs text-[#242424]/70 mb-2 tracking-wider">クレジットカード番号</label>
                <input
                  type="text"
                  maxLength={16}
                  placeholder="4242 4242 4242 4242 (Stripe テスト用)"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
                  className="w-full bg-[#FDFBF7] border border-[#E8E2D5] rounded px-4 py-3 text-sm focus:outline-none focus:border-[#1A2E40] font-mono"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#242424]/70 mb-2 tracking-wider">有効期限</label>
                  <input
                    type="text"
                    maxLength={5}
                    placeholder="MM/YY"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    className="w-full bg-[#FDFBF7] border border-[#E8E2D5] rounded px-4 py-3 text-sm focus:outline-none focus:border-[#1A2E40] font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#242424]/70 mb-2 tracking-wider">セキュリティコード (CVC)</label>
                  <input
                    type="text"
                    maxLength={3}
                    placeholder="123"
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, ""))}
                    className="w-full bg-[#FDFBF7] border border-[#E8E2D5] rounded px-4 py-3 text-sm focus:outline-none focus:border-[#1A2E40] font-mono"
                  />
                </div>
              </div>
              <p className="text-[10px] text-[#242424]/50 leading-relaxed">
                ※本画面はプロトタイプデモです。実際の請求は発生しません。
              </p>
            </div>
          </section>

          {/* Form Submit */}
          <div className="text-center pt-4">
            <button
              type="submit"
              className="bg-[#1A2E40] text-[#FAF6EE] font-serif text-sm tracking-widest py-4 px-12 rounded shadow-sm hover:bg-[#1A2E40]/90 transition-all duration-300"
            >
              プランを購入して、招待リンクを作成する
            </button>
          </div>
        </form>
      </div>

      {/* Drink Selection Modal */}
      {activeSlot !== null && (
        <div className="fixed inset-0 bg-[#242424]/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 font-sans">
          <div className="bg-[#FDFBF7] border border-[#E8E2D5] w-full max-w-2xl rounded-lg shadow-xl overflow-hidden flex flex-col max-h-[85vh] fade-in">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-[#E8E2D5] flex justify-between items-center bg-white">
              <h3 className="font-serif text-base font-semibold text-[#1A2E40] tracking-wide">お酒を選択する</h3>
              <button 
                onClick={() => { setActiveSlot(null); setSearchQuery(""); }}
                className="text-[#242424]/50 hover:text-[#242424] text-lg"
              >
                &times;
              </button>
            </div>

            {/* Filter and Search */}
            <div className="p-4 bg-white border-b border-[#E8E2D5] flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="お酒の名前や特徴で検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-[#FDFBF7] border border-[#E8E2D5] rounded px-3 py-2 text-xs focus:outline-none focus:border-[#1A2E40]"
              />
              <div className="flex gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setSelectedType("all")}
                  className={`px-3 py-2 rounded border ${selectedType === "all" ? "bg-[#1A2E40] text-white border-[#1A2E40]" : "border-[#E8E2D5] text-[#242424]/70"}`}
                >
                  すべて
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedType("日本酒")}
                  className={`px-3 py-2 rounded border ${selectedType === "日本酒" ? "bg-[#1A2E40] text-white border-[#1A2E40]" : "border-[#E8E2D5] text-[#242424]/70"}`}
                >
                  日本酒
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedType("ウイスキー")}
                  className={`px-3 py-2 rounded border ${selectedType === "ウイスキー" ? "bg-[#1A2E40] text-white border-[#1A2E40]" : "border-[#E8E2D5] text-[#242424]/70"}`}
                >
                  ウイスキー
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedType("梅酒")}
                  className={`px-3 py-2 rounded border ${selectedType === "梅酒" ? "bg-[#1A2E40] text-white border-[#1A2E40]" : "border-[#E8E2D5] text-[#242424]/70"}`}
                >
                  梅酒
                </button>
              </div>
            </div>

            {/* Modal Body: Drink List */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              {filteredDrinks.length > 0 ? (
                filteredDrinks.map((drink) => (
                  <div 
                    key={drink.id}
                    className="flex flex-col sm:flex-row gap-6 p-4 rounded-lg bg-white border border-[#E8E2D5] hover:border-[#1A2E40]/40 transition-colors"
                  >
                    {/* Cutout PNG look: container with white background & shadow */}
                    <div className="relative w-full sm:w-28 aspect-[3/4] bg-[#FAF6EE] rounded flex items-center justify-center p-3 border border-[#F1EFEA]">
                      <Image
                        src={drink.image}
                        alt={drink.name}
                        fill
                        className="object-contain p-1"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-baseline mb-2">
                          <h4 className="font-serif text-base font-semibold">{drink.name}</h4>
                          <span className="text-[10px] bg-[#FAF6EE] border border-[#E8E2D5] px-2 py-0.5 rounded text-[#242424]/70">{drink.type}</span>
                        </div>
                        <p className="text-xs text-[#242424]/60 mb-1">【産地】{drink.origin}</p>
                        <p className="text-xs text-[#242424]/80 mb-2 leading-relaxed">{drink.taste}</p>
                        <p className="text-[10px] text-[#242424]/50 italic leading-relaxed">{drink.history}</p>
                      </div>

                      <div className="text-right mt-4">
                        <button
                          type="button"
                          onClick={() => handleSelectDrink(drink)}
                          className="bg-[#1A2E40] text-white text-xs px-4 py-2 rounded hover:bg-[#1A2E40]/90 transition-colors font-serif tracking-wider"
                        >
                          このお酒を選ぶ
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-sm text-[#242424]/40">
                  お酒が見つかりません。
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
