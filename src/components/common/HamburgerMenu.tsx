"use client";
import { useState } from "react";
import Link from "next/link";

export default function HamburgerMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="relative md:hidden">
      <button
        className="ml-2 flex items-center justify-center w-8 h-8 rounded hover:bg-gray-100 transition-colors"
        aria-label="メニュー"
        onClick={() => setMenuOpen(v => !v)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      {menuOpen && (
        <div className="absolute top-10 right-0 z-50 bg-white border rounded shadow-md py-2 w-40 flex flex-col animate-fade-in">
          <Link href="/notices" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setMenuOpen(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            お知らせ
          </Link>
          <Link href="/howto" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setMenuOpen(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <circle cx="12" cy="12" r="10" strokeWidth="2" fill="none" />
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 17h0" />
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 13c0-1.1.9-2 2-2s2-.9 2-2-1.12-2-2.5-2S10 7.9 10 9" />
            </svg>
            使い方
          </Link>
          <Link href="/terms" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setMenuOpen(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth="2" fill="none" />
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M8 8h8M8 12h8M8 16h4" />
            </svg>
            利用規約
          </Link>
          <Link href="/contact" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setMenuOpen(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 10.5V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2v-4.5M16 3.5l-4 4-4-4" />
            </svg>
            お問い合わせ
          </Link>
        </div>
      )}
    </div>
  );
} 