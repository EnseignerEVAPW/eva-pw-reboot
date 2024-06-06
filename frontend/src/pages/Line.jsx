import React from 'react';

const Line = ({ from, to }) => {
  const length = Math.sqrt((to.x - from.x) ** 2 + (to.y - from.y) ** 2);
 
  const angle = Math.atan2(to.y - from.y, to.x - from.x) * 180 / Math.PI;

  return (
    <div
      style={{
        position: 'absolute',
        left: `${from.x}px`,
        top: `${from.y}px`,
        width: `${length}px`,
        transform: `rotate(${angle}deg)`,
        transformOrigin: '0 0',
        borderTop: '2px solid red',
      }}
    />
  );
};

export default Line;
  