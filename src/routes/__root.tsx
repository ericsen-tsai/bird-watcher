import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

import type { QueryClient } from "@tanstack/react-query";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "鳥類直播觀察站" },
      {
        name: "description",
        content:
          "台灣鳥類即時直播觀察平台，支援鳳頭蒼鷹、北方皇家信天翁與東方蜂鷹，分割視窗、筆記與匯出。",
      },
      { name: "theme-color", content: "#1a2e1a" },
      { property: "og:title", content: "鳥類直播觀察站" },
      {
        property: "og:description",
        content:
          "台灣鳥類即時直播觀察平台，支援鳳頭蒼鷹、北方皇家信天翁與東方蜂鷹，分割視窗、筆記與匯出。",
      },
      { property: "og:locale", content: "zh_TW" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico" },
      { rel: "manifest", href: "/site.webmanifest" },
    ],
  }),
  component: RootLayout,
});

function RootLayout() {
  return (
    <html lang="zh-TW">
      <head>
        <HeadContent />
      </head>
      <body className="font-sans antialiased">
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}
