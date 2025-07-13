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

  const goPrev = () => setCurrent((prev) => (prev - 1 + total) % total);
  const goNext = () => setCurrent((prev) => (prev + 1) % total);

  return (
    <div className="relative w-full max-w-xs mx-auto">
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