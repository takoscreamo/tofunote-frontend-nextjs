import React from "react";

interface MentalScoreSliderProps {
  value: number;
  onChange: (value: number) => void;
  label?: string;
  min?: number;
  max?: number;
}

export const MentalScoreSlider: React.FC<MentalScoreSliderProps> = ({
  value,
  onChange,
  label = "メンタルスコア",
  min = 1,
  max = 10,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseInt(e.target.value));
  };

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
    </div>
  );
}; 