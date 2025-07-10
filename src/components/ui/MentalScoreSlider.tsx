import React from "react";

interface MentalScoreSliderProps {
  value: number;
  onChange: (value: number) => void;
  label?: string;
  min?: number;
  max?: number;
}

// 豆腐の種類とロゴのマッピング
const getTofuInfo = (score: number) => {
  if (score >= 1 && score <= 3) {
    return {
      name: "絹豆腐メンタル",
      image: "/tofu-kinu.png",
      description: "もう試合終了したい"
    };
  } else if (score >= 4 && score <= 6) {
    return {
      name: "木綿豆腐メンタル",
      image: "/tofu-momen.png",
      description: "普通に厳しい"
    };
  } else if (score >= 7 && score <= 9) {
    return {
      name: "厚揚げメンタル",
      image: "/tofu-atuage.png",
      description: "わりかし元気かも"
    };
  } else {
    return {
      name: "鋼のメンタル",
      image: "/tofu-hagane.png",
      description: "人生サイコー！！！"
    };
  }
};

export const MentalScoreSlider: React.FC<MentalScoreSliderProps> = ({
  value,
  onChange,
  label = "今日のメンタルは？",
  min = 1,
  max = 10,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseInt(e.target.value));
  };

  const tofuInfo = getTofuInfo(value);

  return (
    <div>
      <div className="relative flex items-center mb-2">
        <label htmlFor="mentalScore" className="block text-sm font-medium">
          {label}
        </label>
        <div className="absolute inset-0 flex items-center justify-center font-semibold text-gray-700">
          {value}
        </div>
      </div>
      <style jsx>{`
        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          height: 6px;
          border-radius: 3px;
          outline: none;
          background: linear-gradient(to right, #14b8a6 0%, #14b8a6 ${(value - min) / (max - min) * 100}%, #f3f4f6 ${(value - min) / (max - min) * 100}%, #f3f4f6 100%);
        }
        
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #14b8a6;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        input[type="range"]::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #14b8a6;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      `}</style>
      <input
        type="range"
        id="mentalScore"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        className="w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
      
      {/* 豆腐ロゴ表示エリア */}
      <div className="p-6 from-teal-50 to-cyan-50 rounded-lg">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex-shrink-0">
            <img
              src={tofuInfo.image}
              alt={tofuInfo.name}
              className="w-24 h-24 md:w-32 md:h-32 object-contain"
            />
          </div>
          <div className="text-center">
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
              {tofuInfo.name}
            </h3>
            <p className="text-base md:text-lg text-gray-600">
              {tofuInfo.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}; 