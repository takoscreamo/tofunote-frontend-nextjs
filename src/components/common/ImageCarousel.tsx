import React, { useState } from "react";
import Image from "next/image";

interface CarouselImage {
  src: string;
  alt: string;
  label?: string;
}

interface ImageCarouselProps {
  images: CarouselImage[];
  onImageClick?: (image: CarouselImage) => void;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, onImageClick }) => {
  const [current, setCurrent] = useState(0);
  const total = images.length;

  // スワイプ用の状態
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragging, setDragging] = useState(false);

  const goPrev = () => setCurrent((prev) => (prev - 1 + total) % total);
  const goNext = () => setCurrent((prev) => (prev + 1) % total);

  // スワイプ判定
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.touches[0].clientX);
  };
  const handleTouchEnd = () => {
    if (touchStartX !== null && touchEndX !== null) {
      const diff = touchStartX - touchEndX;
      if (diff > 40) {
        goNext();
      } else if (diff < -40) {
        goPrev();
      }
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  // マウスドラッグ対応
  const handleMouseDown = (e: React.MouseEvent) => {
    setDragStartX(e.clientX);
    setDragging(true);
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    setTouchEndX(e.clientX);
  };
  const handleMouseUp = () => {
    if (dragging && dragStartX !== null && touchEndX !== null) {
      const diff = dragStartX - touchEndX;
      if (diff > 40) {
        goNext();
      } else if (diff < -40) {
        goPrev();
      }
    }
    setDragging(false);
    setDragStartX(null);
    setTouchEndX(null);
  };

  return (
    <div
      className="relative w-full max-w-xs mx-auto"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{ userSelect: dragging ? 'none' : undefined }}
    >
      <div className="overflow-hidden rounded-lg shadow border border-dashed border-gray-300">
        <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${current * 100}%)` }}>
          {images.map((img) => (
            <div key={img.src} className="flex-shrink-0 w-full flex flex-col items-center">
              <Image
                src={img.src}
                alt={img.alt}
                width={200}
                height={140}
                className="object-contain cursor-pointer"
                onClick={() => onImageClick?.(img)}
              />
              {img.label && <span className="text-xs text-gray-600 mt-2">{img.label}</span>}
            </div>
          ))}
        </div>
      </div>
      {/* 左右ボタン */}
      <button
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-1 shadow hover:bg-blue-100 transition disabled:opacity-30"
        onClick={goPrev}
        disabled={total <= 1}
        aria-label="前へ"
        type="button"
      >
        <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
      </button>
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-1 shadow hover:bg-blue-100 transition disabled:opacity-30"
        onClick={goNext}
        disabled={total <= 1}
        aria-label="次へ"
        type="button"
      >
        <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      </button>
      {/* ドットインジケータ */}
      <div className="flex justify-center mt-2 gap-1">
        {images.map((_, idx) => (
          <button
            key={idx}
            className={`w-2 h-2 rounded-full ${idx === current ? 'bg-blue-500' : 'bg-gray-300'}`}
            onClick={() => setCurrent(idx)}
            aria-label={`画像${idx + 1}へ`}
            type="button"
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel; 