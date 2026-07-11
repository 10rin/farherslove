import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7] text-[#242424] px-6 py-12 md:py-24 font-serif">
      <main className="flex-1 max-w-4xl mx-auto flex flex-col justify-center items-center text-center fade-in">
        {/* Header Concept */}
        <span className="text-xs tracking-[0.2em] text-[#1A2E40]/60 font-sans mb-8">
          親子のしずかな定期便
        </span>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.15em] leading-tight mb-6">
          おくり酒
        </h1>
        
        <p className="text-sm md:text-base leading-relaxed text-[#242424]/80 max-w-lg mb-16 font-sans">
          言葉にするのは少し気恥ずかしい、「不器用な愛情」と「自分の趣味」。<br />
          半年に3回、父親から息子へお酒とグラスを静かに送る。<br />
          帰省したとき、はじめて二つのグラスが揃い、一緒に飲むためのサービス。
        </p>

        {/* Visual Showcase (Images) */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl w-full mb-20">
          <div className="flex flex-col items-center">
            <div className="relative w-full aspect-[4/5] bg-white rounded-lg shadow-sm border border-[#E8E2D5] overflow-hidden flex items-center justify-center p-4 group transition-transform duration-500 hover:-translate-y-1">
              <Image 
                src="/images/sake.jpg" 
                alt="日本酒 天麟" 
                fill 
                className="object-contain p-2"
              />
            </div>
            <span className="text-[10px] tracking-wider text-[#242424]/60 mt-2 font-sans">日本酒「天麟」</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="relative w-full aspect-[4/5] bg-white rounded-lg shadow-sm border border-[#E8E2D5] overflow-hidden flex items-center justify-center p-4 group transition-transform duration-500 hover:-translate-y-1">
              <Image 
                src="/images/whisky.jpg" 
                alt="ウイスキー 光" 
                fill 
                className="object-contain p-2"
              />
            </div>
            <span className="text-[10px] tracking-wider text-[#242424]/60 mt-2 font-sans">ウイスキー「光」</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="relative w-full aspect-[4/5] bg-white rounded-lg shadow-sm border border-[#E8E2D5] overflow-hidden flex items-center justify-center p-4 group transition-transform duration-500 hover:-translate-y-1">
              <Image 
                src="/images/umeshu.jpg" 
                alt="特選梅酒 大和" 
                fill 
                className="object-contain p-2"
              />
            </div>
            <span className="text-[10px] tracking-wider text-[#242424]/60 mt-2 font-sans">特選梅酒「大和」</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md font-sans">
          <Link
            href="/parent/setup"
            className="flex-1 bg-[#1A2E40] text-[#FAF6EE] text-sm py-4 px-8 rounded-md tracking-wider shadow-sm hover:bg-[#1A2E40]/90 transition-all duration-300 flex items-center justify-center"
          >
            父親として：お酒を選んで送る
          </Link>
          <Link
            href="/select?token=demo"
            className="flex-1 border border-[#1A2E40]/25 text-[#1A2E40] text-sm py-4 px-8 rounded-md tracking-wider hover:bg-[#1A2E40]/5 transition-all duration-300 flex items-center justify-center"
          >
            息子として：QRから開く（帰省選択）
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 text-center text-[10px] tracking-widest text-[#242424]/40 font-sans">
        &copy; {new Date().getFullYear()} おくり酒 / farherslove. All rights reserved.
      </footer>
    </div>
  );
}
