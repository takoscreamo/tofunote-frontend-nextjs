"use client";

export default function ContactPage() {
  return (
    <div className="max-w-xs w-full mx-auto py-8 px-2">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">お問い合わせ</h1>
      <p className="text-sm text-gray-700 mb-4">ご質問・ご要望などお気軽にご連絡ください。</p>
      <div className="flex flex-col items-center mt-8 mb-4">
        <div className="flex gap-4">
          <a href="https://x.com/takoscreamo" target="_blank" rel="noopener noreferrer" className="flex items-center text-xs text-black hover:underline">
            <svg width="18" height="18" viewBox="0 0 1200 1227" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1"><path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" fill="currentColor"/></svg>
          </a>
          <a href="https://github.com/takoscreamo" target="_blank" rel="noopener noreferrer" className="flex items-center text-xs text-gray-700 hover:underline">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="mr-1"><path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.48 2.87 8.28 6.84 9.63.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.17-1.1-1.48-1.1-1.48-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.38-2.03 1.01-2.75-.1-.26-.44-1.3.1-2.7 0 0 .83-.27 2.73 1.02a9.18 9.18 0 0 1 2.49-.34c.85 0 1.71.11 2.5.34 1.89-1.29 2.72-1.02 2.72-1.02.54 1.4.2 2.44.1 2.7.63.72 1 1.63 1 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12.26C22 6.58 17.52 2 12 2z"/></svg>
          </a>
        </div>
      </div>
    </div>
  );
} 