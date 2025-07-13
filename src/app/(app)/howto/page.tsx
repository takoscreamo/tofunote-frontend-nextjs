"use client";
import { useState } from "react";
import ImageCarousel from '@/components/common/ImageCarousel';
import ImageModal from '@/components/common/ImageModal';

export default function HowToPage() {
  const [modalImage, setModalImage] = useState<{src: string, alt: string} | null>(null);
  return (
    <div className="max-w-2xl mx-auto py-8 px-2">
      <h1 className="text-2xl font-bold mb-4">使い方</h1>
      <p className="mb-4 text-gray-700">TOFU NOTEは、あなたのメンタルの記録・可視化・振り返りをサポートするアプリです。<br />下記のサンプル画面を参考に、日々の記録やグラフ、設定機能をご活用ください。</p>
      <ImageCarousel
        images={[
          { src: '/sample_diary.png', alt: '記録画面サンプル', label: '記録画面' },
          { src: '/sample_graph.png', alt: 'グラフ画面サンプル', label: 'グラフ画面' },
          { src: '/sample_settings.png', alt: '設定画面サンプル', label: '設定画面' },
        ]}
        onImageClick={(img) => setModalImage({ src: img.src, alt: img.alt })}
      />
      {modalImage && (
        <ImageModal open={true} src={modalImage.src} alt={modalImage.alt} onClose={() => setModalImage(null)} />
      )}
      <div className="mt-8 text-sm text-gray-600">
        <ul className="list-disc pl-5 space-y-2">
          <li>「記録」画面で、毎日の気分や出来事を簡単に記録できます。</li>
          <li>「グラフ」画面で、メンタルの推移をグラフで確認できます。</li>
          <li>「設定」画面で、ニックネームの変更や退会などの各種設定が行えます。</li>
        </ul>
      </div>
    </div>
  );
} 