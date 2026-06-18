export type BirdId = 'goshawk' | 'nightjar'

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
  autoDetectLive?: boolean
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
      { id: 'chongxing-2026', videoId: 'gsCR_X6Dx_U', label: '中興大學 2026' },
      { id: 'yilan-2026', videoId: 'q_2234WOCkA', label: '宜蘭大學 2026' },
      { id: 'daan-2026', videoId: 'gsCR_X6Dx_U', label: '大安森林公園 2026' },
    ],
    youtubeChannelHandle: '@RRGT',
    autoDetectLive: true,
  },
  nightjar: {
    id: 'nightjar',
    commonName: '南亞夜鷹',
    scientificName: 'Caprimulgus affinis',
    englishName: 'Savanna Nightjar',
    conservationStatus: '非保育類（台灣特有亞種 C. a. stictomus）',
    taxonomy: {
      order: '夜鷹目 Caprimulgiformes',
      family: '夜鷹科 Caprimulgidae',
      genus: '夜鷹屬 Caprimulgus',
    },
    physicalTraits: [
      '體長約 20–25 cm，頭大頸短，翼尾皆長',
      '全身灰褐至黃褐色，密布黑褐色斑紋，保護色極佳',
      '雄鳥翼上具醒目白色斑塊，雌鳥為米黃色',
      '雄鳥喉部兩塊白色橫斑，雌鳥不明顯',
      '喙寬闊，基部有剛毛，適合空中邊飛邊捕食飛蟲',
      '白天停棲地面或平頂，眼微閉但保持警戒',
    ],
    diet: ['飛蟲（蚊、蚋、蛾等）'],
    breeding: {
      season: '3 月–7 月',
      incubation: '約 17–18 天（雙親共同孵卵）',
      fledging: '雛鳥約 2 週後可離巢',
      clutchSize: '通常 2 顆（直接產於地面，不築巢）',
    },
    habitat: '河床、開闊地、機場、工業區；近年常見於都市 6–8 層平頂建築',
    distribution: '台灣本島低海拔普遍留鳥',
    funFacts: [
      '晨昏及夜間活躍，繁殖期雄鳥常整夜鳴叫「逐伊—」',
      '不築巢，直接將蛋產於地面或屋頂',
      '都市屋頂繁殖成功率常高於自然棲地',
      '腳短無力，幾乎不行走，全靠飛行',
    ],
    breedingTimeline: [
      { label: '求偶鳴叫', months: '3–4 月', icon: '🌙' },
      { label: '產卵', months: '4–5 月', icon: '🥚' },
      { label: '孵卵', months: '5–6 月', icon: '🐣' },
      { label: '育雛', months: '6–7 月', icon: '🐥' },
    ],
    streams: [
      { id: 'nightjar-live-1', videoId: 'LqvI2yZICUs', label: '直播一' },
      { id: 'nightjar-live-2', videoId: 'Po19VWKuFdo', label: '直播二' },
    ],
    autoDetectLive: false,
  },
}

export const BIRD_IDS = Object.keys(BIRDS) as BirdId[]

export function isBreedingSeason(birdId: BirdId): boolean {
  const month = new Date().getMonth() + 1
  if (birdId === 'goshawk') return month >= 3 && month <= 7
  if (birdId === 'nightjar') return month >= 3 && month <= 7
  return false
}
