  import React from 'react';

  const Circle = ({ x, y }) => (
    <div
      className="circle"
      style={{
        position: 'absolute',
        left: x - 5,
        top: y - 5,
        width: 10,
        height: 10,
        borderRadius: '50%',
        backgroundColor: 'green',
      }}
    />
  );

  export default Circle;
