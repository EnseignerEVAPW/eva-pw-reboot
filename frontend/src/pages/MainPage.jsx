import React, { useRef } from 'react';
import Compete from './Compete';

const MainPage = () => {
  const competeRef = useRef();

  const handleSaveComments = () => {
    if (competeRef.current) {
      const commentsJSON = competeRef.current.serializeComments();
      console.log(commentsJSON);
    }
  };

  return (
    <div className="relative h-screen bg-gray-900">
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="w-3/4 h-3/4 bg-white p-4 flex shadow-lg">
          <div className="w-1/3 p-4 bg-white overflow-y-auto">
            <h2>Lorem Ipsum</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vehicula, lorem ut egestas vehicula, ipsum lacus efficitur odio, sit amet dignissim lorem metus nec metus.</p>
          </div>
          <div className="flex-1 bg-gray-400 relative"></div>
        </div>
      </div>
      <Compete ref={competeRef} />
      <button onClick={handleSaveComments} className="absolute bottom-4 right-4 p-2 bg-blue-500 text-white rounded">Guardar Comentarios</button>
    </div>
  );
};

export default MainPage;
