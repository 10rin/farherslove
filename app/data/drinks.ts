export interface Drink {
  id: string;
  name: string;
  englishName: string;
  type: string;
  image: string;
  origin: string;
  taste: string;
  history: string;
}

export const DRINKS: Drink[] = [
  {
    id: "sake",
    name: "天麟 (てんりん)",
    englishName: "TENRIN",
    type: "日本酒 (純米大吟醸)",
    image: "/images/sake.jpg",
    origin: "兵庫県・白鶴酒造",
    taste: "華やかな香りと、すっきりとした上品な甘みが特徴。冷やすとより引き締まった味わいになります。",
    history: "伝統ある酒蔵の技術を結集し、厳選された山田錦を極限まで磨き上げて醸した、特別な席にふさわしい一本。"
  },
  {
    id: "whisky",
    name: "光 (ひかり)",
    englishName: "HIKARI",
    type: "シングルモルトウイスキー",
    image: "/images/whisky.jpg",
    origin: "京都府・氷室蒸留所",
    taste: "バニラのような甘い香りと、ほのかなスモーキーさ。まろやかで奥深い余韻が長く続きます。",
    history: "京都の清らかな湧水と伝統の樽熟成技術を用いて、18年以上の歳月をかけてゆっくりと育まれたシングルモルト。"
  },
  {
    id: "umeshu",
    name: "大和 特選梅酒",
    englishName: "YAMATO",
    type: "本格梅酒 (熟成 紀州南高梅)",
    image: "/images/umeshu.jpg",
    origin: "和歌山県・紀州本家",
    taste: "完熟した南高梅の芳醇な香りと、心地よい酸味。濃厚でありながら、飽きのこないすっきりとした後味。",
    history: "一粒一粒手摘みされた大粒の南高梅を、蔵人がじっくりと長期間熟成させ、極上のまろやかさを引き出した至極の梅酒。"
  }
];
