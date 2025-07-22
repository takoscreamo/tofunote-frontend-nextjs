import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: {
    default: "TOFU NOTE - 豆腐メンタルを俯瞰するアプリ",
    template: "%s | TOFU NOTE"
  },
  description: "TOFU NOTE（豆腐ノート・とうふノート・とーふノート・トウフノート・トーフノート）は、あなたのメンタルスコアを記録し、豆腐メンタルを可視化・俯瞰するアプリケーションです。",
  keywords: [
    "TOFU NOTE",
    "tofu note",
    "TOFUNOTE",
    "tofunote",
    "豆腐ノート",
    "とうふノート",
    "とーふノート",
    "トウフノート",
    "トーフノート",
    "豆腐メンタル",
    "メンタルヘルス",
    "日記",
    "メンタルスコア",
    "記録アプリ"
  ],
  manifest: "/manifest.json",
  themeColor: "#4F46E5",
  icons: [
    {
      rel: "icon",
      url: "/logoicon.png.webp",
      sizes: "192x192",
      type: "image/png"
    },
    {
      rel: "icon",
      url: "/logoicon.png.webp",
      sizes: "512x512",
      type: "image/png"
    }
  ],
  openGraph: {
    title: "TOFU NOTE - 豆腐メンタルを俯瞰するアプリ",
    description: "TOFU NOTE（豆腐ノート・とうふノート・とーふノート・トウフノート・トーフノート）は、あなたのメンタルスコアを記録し、豆腐メンタルを可視化・俯瞰するアプリケーションです。",
    url: "https://tofunote.takoscreamo.com/",
    siteName: "TOFU NOTE",
    images: [
      {
        url: "/logoicon.png.webp",
        width: 512,
        height: 512,
        alt: "TOFU NOTE ロゴ",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TOFU NOTE - 豆腐メンタルを俯瞰するアプリ",
    description: "TOFU NOTE（豆腐ノート・とうふノート・とーふノート・トウフノート・トーフノート）は、あなたのメンタルスコアを記録し、豆腐メンタルを可視化・俯瞰するアプリケーションです。",
    images: ["/logoicon.png.webp"],
    site: "@takoscreamo",
  },
  metadataBase: new URL("https://tofunote.takoscreamo.com"),
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gray-50`}>
        {children}
      </body>
    </html>
  );
}
