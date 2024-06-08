import React from 'react';

const Line = ({ from, to }) => {
  const length = Math.sqrt((to.x - from.x) ** 2 + (to.y - from.y) ** 2);
  const angle = Math.atan2(to.y - from.y, to.x - from.x) * 180 / Math.PI;

  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: `${from.x}px`,
          top: `${from.y}px`,
          width: `${length}px`,
          transform: `rotate(${angle}deg)`,
          transformOrigin: '0 50%',
          borderTop: '3.5px solid #A8A5FF',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: `${from.x - 7}px`,
          top: `${from.y - 7}px`,
          width: '14px',
          height: '14px',
          borderRadius: '50%',
          backgroundColor: '#A8A5FF',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: `${to.x - 0}px`,
          top: `${to.y - 0}px`,
          width: '14px',
          height: '14px',
          borderRadius: '50%',
          backgroundColor: '#A8A5FF',
        }}
      />
    </>
  );
};

export default Line;
