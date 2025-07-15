import React from "react";

export default function NoticesPage() {
  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">お知らせ</h1>
      <div className="bg-white rounded shadow p-4 mb-4">
        <h2 className="text-lg font-semibold">バージョン0.1.0リリース</h2>
        <p className="text-sm text-gray-600 mt-1">2025年7月15日</p>
        <p className="mt-2">アプリの初回リリースを行いました。今後ともよろしくお願いいたします。<br />
          詳細はQiita記事もご覧ください：
          <a href="https://qiita.com/takoscreamo/items/216209d36cfd5ef6326e" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline ml-1 break-all">
            https://qiita.com/takoscreamo/items/216209d36cfd5ef6326e
          </a>
        </p>
      </div>
    </div>
  );
} 