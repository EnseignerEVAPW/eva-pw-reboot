  import React from 'react';

  const Circle = ({ x, y }) => (
    <div
      className="circle"
      style={{
        position: 'absolute',
        left: x - 5,
        top: y - 5,
        width: 0,
        height: 0,
        borderRadius: '50%',
        backgroundColor: '#A8A5FF',
      }}
    />
  );

  export default Circle;
