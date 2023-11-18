import React from 'react';
import { Image } from 'antd';

function CarImage({ src, width, height, ...props }) {
  return (
    <img
      className="image-container"
      src={src}
      style={{
        transform: 'rotate(90deg)',
        top: 76,
        left: 181
      }}
    />
  );
}

export default CarImage;
