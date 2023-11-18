import React from 'react';
import { Image } from 'antd';

function CarImage({ slotId, src, width, height, ...props }) {
  return (
    <img
      className="image-container"
      src={src}
      style={{
        transform: 'rotate(90deg)',
        top: 76,
        left: 180
      }}
    />
  );
}

export default CarImage;
