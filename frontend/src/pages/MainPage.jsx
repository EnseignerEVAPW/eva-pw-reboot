import React, { useRef, useEffect } from 'react';
import Compete from './Compete';

const MainPage = () => {
  // Definimos los comentarios iniciales directamente en el código
  const initialComments = [{"id":1717693652437,"user":"Usuario1","text":"esto deveria cambiar ","xPercentage":37.774524158125914,"yPercentage":14.727540500736378,"commentXPercentage":51.87059171074506,"commentYPercentage":57.59095271535508},{"id":1717693654781,"user":"Usuario1","text":"deberia es con \"b\"","xPercentage":37.55490483162519,"yPercentage":84.38880706921944,"commentXPercentage":24.25160159307569,"commentYPercentage":40.94882963055807},{"id":1717693664053,"user":"Usuario1","text":"este es punto central ","xPercentage":59.516837481698396,"yPercentage":39.175257731958766,"commentXPercentage":81.50679980641738,"commentYPercentage":22.454797825257312}];

  const competeRef = useRef();

  useEffect(() => {
    if (initialComments && competeRef.current) {
      competeRef.current.loadComments(initialComments);
    }
  }, []);

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
