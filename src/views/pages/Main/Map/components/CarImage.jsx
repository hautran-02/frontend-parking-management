import React from 'react';
import { Image } from 'antd';

function CarImage({ slotId, top, left, rotate, src, width, height, ...props }) {
  return (
    <img
      className="image-container"
      src={src}
      style={{
        transform: `rotate(${rotate}deg)`,
        width: 52,
        top,
        left
      }}
    />
  );
}

export default CarImage;
