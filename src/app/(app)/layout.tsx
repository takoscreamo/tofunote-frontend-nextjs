import type { ReactNode } from "react";
import Link from "next/link";
import AuthGuard from "@/components/common/AuthGuard";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { NicknameDisplay } from "@/components/common/NicknameDisplay";
import Image from 'next/image';
import HamburgerMenu from "@/components/common/HamburgerMenu";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function AppLayout({ children }: { children: ReactNode }) {
  // ニックネーム表示
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gray-50`}>
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <Link href="/" className="flex items-center gap-2 text-xl font-bold text-gray-900 hover:text-gray-700 transition-colors">
                  <Image src="/logotext.png.webp" alt="アプリロゴ" width={100} height={32} />
                  <span className="text-xs text-gray-400 font-normal align-bottom">ver 0.1.0</span>
                </Link>
              </div>
              <div className="flex items-center space-x-8">
                <nav className="hidden md:flex items-center space-x-8">
                  <Link href="/diary" className="text-gray-600 hover:text-gray-900">記録</Link>
                  <Link href="/graph" className="text-gray-600 hover:text-gray-900">グラフ</Link>
                  <Link href="/settings" className="text-gray-600 hover:text-gray-900">設定</Link>
                </nav>
                {/* PC用: お知らせ・使い方・利用規約・お問い合わせアイコン */}
                <div className="hidden md:flex items-center space-x-4 ml-4">
                  <Link href="/notices" className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors" aria-label="お知らせ">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </Link>
                  <Link href="/howto" className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors" aria-label="使い方">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <circle cx="12" cy="12" r="10" strokeWidth="2" fill="none" />
                      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 17h0" />
                      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 13c0-1.1.9-2 2-2s2-.9 2-2-1.12-2-2.5-2S10 7.9 10 9" />
                    </svg>
                  </Link>
                  <Link href="/terms" className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors" aria-label="利用規約">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth="2" fill="none" />
                      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M8 8h8M8 12h8M8 16h4" />
                    </svg>
                  </Link>
                  <Link href="/contact" className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors" aria-label="お問い合わせ">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 10.5V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2v-4.5M16 3.5l-4 4-4-4" />
                    </svg>
                  </Link>
                </div>
                {/* ニックネーム表示・ハンバーガーメニュー */}
                <div className="flex items-center">
                  <NicknameDisplay />
                  <HamburgerMenu />
                </div>
                {/* アカウントアイコン */}
                {/* <Link
                  href="/settings"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </Link> */}
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 pb-16 md:pb-0">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <AuthGuard>{children}</AuthGuard>
          </div>
        </main>
        {/* モバイル用ボトムナビゲーション */}
        <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t">
          <div className="grid h-16 grid-cols-3">
            <Link
              href="/diary"
              className="flex flex-col items-center justify-center text-gray-600 hover:text-gray-900"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.862 3.487a2.25 2.25 0 113.182 3.182L7.75 18.963l-4 1 1-4 12.112-12.476z" />
              </svg>
              <span className="text-xs mt-1">記録</span>
            </Link>
            <Link
              href="/graph"
              className="flex flex-col items-center justify-center text-gray-600 hover:text-gray-900"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
              <span className="text-xs mt-1">グラフ</span>
            </Link>
            <Link
              href="/settings"
              className="flex flex-col items-center justify-center text-gray-600 hover:text-gray-900"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-xs mt-1">設定</span>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
} 