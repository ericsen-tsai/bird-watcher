# 鳥類直播觀察站

台灣鳥類即時直播觀察平台，支援多物種切換（鳳頭蒼鷹、北方皇家信天翁、東方蜂鷹）。

## 功能

- 嵌入 YouTube 即時直播
- 多鳥種切換：鳳頭蒼鷹、北方皇家信天翁、東方蜂鷹
- 可調整大小的分割視窗：直播 + 物種資訊 + 筆記
- 物種百科：外觀特徵、食性、繁殖時程
- 筆記功能：匯出 Markdown 或 CSV，per-bird localStorage
- 響應式設計：桌面版分割面板 / 行動版分頁切換

## 開始使用

```bash
npm install
npm run dev
```

開發伺服器預設在 http://localhost:3000

此應用程式不需要環境變數即可正常運作。

## 技術架構

- [TanStack Start](https://tanstack.com/start) — 全端 React 框架（SSR + 檔案路由）
- [Tailwind CSS v4](https://tailwindcss.com/) — 樣式
- [react-resizable-panels](https://github.com/bvaughn/react-resizable-panels) — 可調整面板
- [Lucide React](https://lucide.dev/) — 圖示

## 致謝

- [台灣猛禽研究會](https://raptor.org.tw) — 鳳頭蒼鷹巢位直播與研究資料
