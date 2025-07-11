import React from "react";
import Image from "next/image";

interface ImageModalProps {
  open: boolean;
  src: string;
  alt?: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ open, src, alt, onClose }) => {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-200 bg-opacity-80" // 明るいグレーで透過
      onClick={onClose}
    >
      <div className="relative" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-center max-w-[90vw] max-h-[80vh]">
          <Image
            src={src}
            alt={alt || "拡大画像"}
            width={800}
            height={600}
            className="rounded-lg shadow-lg object-contain max-w-full max-h-[80vh]"
            style={{ width: 'auto', height: 'auto', maxWidth: '90vw', maxHeight: '80vh' }}
            priority
          />
        </div>
        <button
          className="absolute top-2 right-2 text-white bg-black bg-opacity-90 rounded-full px-3 py-2 text-2xl shadow-lg border-2 border-white transition hover:bg-red-600 hover:scale-110 hover:shadow-2xl focus:outline-none"
          onClick={onClose}
          aria-label="閉じる"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default ImageModal; 