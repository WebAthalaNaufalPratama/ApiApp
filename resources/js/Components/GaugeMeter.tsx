import React, { useEffect, useState } from 'react';

const GaugeMeter = ({ min = 0, max = 100, value = 50 }) => {
  const [rotation, setRotation] = useState(0);

  // Calculate adjusted min, max, and value
  const adjustedMin = Math.min(min, max);
  const adjustedMax = Math.max(min, max);
  const adjustedValue = Math.min(Math.max(value, adjustedMin), adjustedMax);

  const percentage = adjustedValue >= adjustedMax
    ? 135
    : ((adjustedValue - adjustedMin) / (adjustedMax - adjustedMin)) * 100;

  // Calculate the rotation based on value
  const targetRotation = adjustedValue >= adjustedMax
    ? 135
    : percentage + 35;

  // Update rotation whenever the value changes
  useEffect(() => {
    setRotation(targetRotation);
  }, [targetRotation]);

  return (
    <div className="relative flex aspect-[2] items-center justify-center overflow-hidden rounded-t-full bg-green-400">
      {/* Animated Gauge Needle */}
      <div
        className="absolute top-0 aspect-square w-full rotate-[calc(72deg-45deg)] bg-gradient-to-tr from-transparent from-50% to-white to-50% transition-transform duration-1000 ease-out"
        style={{ transform: `rotate(${rotation}deg)` }} // Apply the dynamic rotation here
      ></div>

      {/* Inner Circle */}
      <div className="absolute top-1/4 flex aspect-square w-3/4 justify-center rounded-full bg-green-100"></div>

      {/* Value Display */}
      <div className="absolute bottom-0 w-full truncate text-center text-[5vmax] leading-none">
        {value}
      </div>
    </div>
  );
};

export default GaugeMeter;
