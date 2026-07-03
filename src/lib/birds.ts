export type BirdId = 'goshawk' | 'albatross' | 'honey-buzzard'

export interface BirdProfile {
  id: BirdId
  commonName: string
  scientificName: string
  englishName: string
  conservationStatus: string
  taxonomy: { order: string; family: string; genus: string }
  physicalTraits: string[]
  diet: string[]
  breeding: { season: string; incubation: string; fledging: string; clutchSize: string }
  habitat: string
  distribution: string
  bandedIndividuals?: { id: string; description: string }[]
  funFacts: string[]
  breedingTimeline: { label: string; months: string; icon: string }[]
  streams: { id: string; videoId: string; label: string }[]
  youtubeChannelHandle?: string
}

export const DEFAULT_BIRD_ID: BirdId = 'goshawk'

export const BIRDS: Record<BirdId, BirdProfile> = {
  goshawk: {
    id: 'goshawk',
    commonName: '鳳頭蒼鷹',
    scientificName: 'Accipiter trivirgatus',
    englishName: 'Crested Goshawk',
    conservationStatus: '珍貴稀有保育類（第二級）',
    taxonomy: {
      order: '鷹形目 Accipitriformes',
      family: '鷹科 Accipitridae',
      genus: '鷹屬 Accipiter',
    },
    physicalTraits: [
      '體長 37–48 cm，翼展 65–85 cm',
      '台灣特有亞種 A. t. formosae',
      '頭頂有明顯短冠羽（鳳頭之名由來）',
      '成鳥胸腹部具淡褐色縱斑',
      '虹膜成鳥黃色，幼鳥灰綠色',
      '雌鳥體型明顯大於雄鳥',
    ],
    diet: [
      '鳥類（麻雀、斑鳩、綠繡眼等）',
      '蜥蜴與壁虎',
      '松鼠',
      '大型昆蟲',
      '偶爾捕食蛇類',
    ],
    breeding: {
      season: '3 月–7 月',
      incubation: '約 34–39 天',
      fledging: '約 35 日齡起離巢，45 日齡左右可獨立活動',
      clutchSize: '1–3 顆，多數 2 顆',
    },
    habitat: '低海拔闊葉林、都市公園與校園綠地',
    distribution: '台灣全島低海拔地區，近年於都市公園穩定繁殖（如大安森林公園、台中興大校園）',
    bandedIndividuals: [
      { id: '橘H4', description: '大安森林公園知名個體' },
      { id: '黃N2', description: '多年繁殖紀錄' },
      { id: '橘J1', description: '幼鳥追蹤個體' },
    ],
    funFacts: [
      '台灣唯一在都會區穩定繁殖的日行性猛禽',
      '每年繁殖季會重複使用或修補舊巢',
      '幼鳥離巢後約 1–2 個月仍會回巢附近乞食',
      '台灣猛禽研究會自 2013 年起持續進行巢位直播',
      '直播攝影機在雛鳥孵化約 10 天後才安裝，避免干擾親鳥',
    ],
    breedingTimeline: [
      { label: '築巢', months: '2–3 月', icon: '🏗️' },
      { label: '產卵', months: '3–4 月', icon: '🥚' },
      { label: '孵化', months: '4–5 月', icon: '🐣' },
      { label: '育雛', months: '5–6 月', icon: '🐥' },
      { label: '離巢', months: '6–7 月', icon: '🦅' },
    ],
    streams: [
      { id: 'chongxing-2026', videoId: '8CmECCFBWiY', label: '中興大學 2026' },
      { id: 'yilan-2026', videoId: 'q_2234WOCkA', label: '宜蘭大學 2026' },
      { id: 'daan-2026', videoId: 'gsCR_X6Dx_U', label: '大安森林公園 2026' },
    ],
    youtubeChannelHandle: '@RRGT',
  },
  albatross: {
    id: 'albatross',
    commonName: '北方皇家信天翁',
    scientificName: 'Diomedea sanfordi',
    englishName: 'Northern Royal Albatross',
    conservationStatus: 'IUCN 瀕危（EN）；紐西蘭 Threatened – Nationally Vulnerable',
    taxonomy: {
      order: '鹱形目 Procellariiformes',
      family: '信天翁科 Diomedeidae',
      genus: '信天翁屬 Diomedea',
    },
    physicalTraits: [
      '體長約 115 cm，體重 6.2–8.2 kg',
      '翼展 270–305 cm，為世界最大海鳥之一',
      '成鳥主要白色，上翼及背側為黑色',
      '粉紅色大喙，上喙具黑色切緣',
      '幼鳥頭頸及背部具黑褐色斑點，隨年齡逐漸變白',
      '通常終生配對，雙親共同孵育',
    ],
    diet: [
      '魷魚與其他頭足類（可占食性 85% 以上）',
      '魚類',
      '甲殼類',
      '樽海鞘（Salps）',
      '偶爾取食漁業廢棄物或腐肉',
    ],
    breeding: {
      season: '9 月–隔年 2 月（南半球繁殖週期）',
      incubation: '約 79 天',
      fledging: '約 240 天後離巢（隔年 9–10 月）',
      clutchSize: '每 2 年 1 顆（若成功育雛則隔年繁殖）',
    },
    habitat: '繁殖於離岸島嶼及 Otago Peninsula 陸地殖民地；非繁殖期生活於南太平洋及南印度洋外海',
    distribution:
      '紐西蘭特有；主要繁殖於 Chatham Islands（約 99%），Taiaroa Head（Otago Peninsula）為全球唯一大陸繁殖地',
    funFacts: [
      'Taiaroa Head 為全球唯一可從陸地觀察的皇家信天翁繁殖地',
      '一生約 85% 時間在海上，每年可飛行約 19 萬公里',
      '利用動態 soaring 技術，幾乎不拍翼即可長距離飛行',
      '平均 8 歲首次繁殖，3–4 歲開始返回繁殖地',
      'Royal Albatross Centre 提供 Taiaroa Head 巢位直播',
    ],
    breedingTimeline: [
      { label: '返巢', months: '9–11 月', icon: '🌊' },
      { label: '築巢', months: '10 月', icon: '🏗️' },
      { label: '產卵', months: '10–11 月', icon: '🥚' },
      { label: '孵化', months: '1–2 月', icon: '🐣' },
      { label: '離巢', months: '9–10 月', icon: '🦅' },
    ],
    streams: [{ id: 'albatross-live', videoId: 'Mm_zVDDUeNA', label: '直播' }],
  },
  'honey-buzzard': {
    id: 'honey-buzzard',
    commonName: '東方蜂鷹',
    scientificName: 'Pernis ptilorhynchus',
    englishName: 'Oriental Honey Buzzard',
    conservationStatus: '珍貴稀有保育類',
    taxonomy: {
      order: '鷹形目 Accipitriformes',
      family: '鷹科 Accipitridae',
      genus: '蜂鷹屬 Pernis',
    },
    physicalTraits: [
      '中型猛禽，體長約 57–67 cm',
      '羽色多型：暗色型、淡色型、中間型',
      '頭頸細長，眼先密生鱗狀羽以防蜂螫',
      '頭部較其他猛禽小，適合鑽入蜂巢覓食',
      '爪較長直，抓力弱，不擅長捕捉活體獵物',
      '雌雄相似，幼鳥羽色與成鳥有差異',
    ],
    diet: [
      '蜂蛹與幼蟲（蜜蜂、虎頭蜂、馬蜂、異腹胡蜂等）',
      '整個小型蜂巢',
      '養蜂場棄置的贅巢',
      '偶爾取食其他昆蟲幼蟲',
    ],
    breeding: {
      season: '3 月–8 月',
      incubation: '約 30–35 天（雙親共同孵卵）',
      fledging: '雛鳥約 6 月孵出，8 月左右離巢',
      clutchSize: '通常 2 顆',
    },
    habitat: '中低海拔闊葉林、人造林與果園；亦見於養蜂場附近',
    distribution:
      '東亞至東南亞廣泛分布；台灣有留鳥繁殖族群與過境/度冬遷徙族群',
    funFacts: [
      '繁殖季較台灣其他猛禽晚，推測與蜂類活動週期有關',
      '頭部細小鱗羽可減少被蜂群攻擊的傷害',
      '會連續數日取食大型虎頭蜂巢，甚至倒掛在巢上休息',
      '台灣留鳥族群會在養蜂場「埋伏」，取食蜂農整理後的贅巢',
      '9 月起有大量日本繁殖族群過境南下度冬',
    ],
    breedingTimeline: [
      { label: '求偶', months: '3–4 月', icon: '🦅' },
      { label: '產卵', months: '5 月', icon: '🥚' },
      { label: '孵化', months: '6 月', icon: '🐣' },
      { label: '育雛', months: '6–7 月', icon: '🐥' },
      { label: '離巢', months: '8 月', icon: '🌿' },
    ],
    streams: [{ id: 'honey-buzzard-live', videoId: 'kWbblcz3ZzQ', label: '直播' }],
    youtubeChannelHandle: '@RRGT',
  },
}

export const BIRD_IDS = Object.keys(BIRDS) as BirdId[]

export function isBreedingSeason(birdId: BirdId): boolean {
  const month = new Date().getMonth() + 1
  if (birdId === 'goshawk') return month >= 3 && month <= 7
  if (birdId === 'albatross') return month >= 9 || month <= 2
  if (birdId === 'honey-buzzard') return month >= 3 && month <= 8
  return false
}
