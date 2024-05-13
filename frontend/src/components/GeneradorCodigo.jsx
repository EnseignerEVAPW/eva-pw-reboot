import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function GeneradorCodigo() {
  const [codeInvite, setCodeInvite] = useState('');
  const [navigateOnCode, setNavigateOnCode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (navigateOnCode && codeInvite) {
      console.log('Código de invitación generado:', codeInvite);
      localStorage.setItem('isCreator', true);
      navigate(`/entrenar?codeInvite=${codeInvite}&isCreator=true`);
    }
  }, [codeInvite, navigateOnCode, navigate]);

  function generateCode() {
    let result = '';
    for (let i = 0; i < 7; i++) {
      let character;
      const random = Math.random();
      if (random < 0.34) {
        character = parseInt(Math.random() * 10) + 48;
      } else if (random < 0.66) {
        character = parseInt(Math.random() * 26) + 65;
      } else {
        character = parseInt(Math.random() * 26) + 97;
      }
      result += String.fromCharCode(character);
    }
    setCodeInvite(result);
  }

  const handleCreateRoom = () => {
    localStorage.removeItem('hasReloaded');
    generateCode();
    setNavigateOnCode(true);
  };

  const handleJoin = () => {
    localStorage.removeItem('hasReloaded');
    localStorage.removeItem('isCreator');
    navigate(`/entrenar?codeInvite=${codeInvite}`);
  };

  return (
    <div className="p-8 rounded-xl shadow-lg">
      <div className="text-lg text-white mb-3">Sala de Entrenamiento</div>
      <div className="p-4 rounded-xl bg-gray-800">
      // descripcion
        <div className="flex flex-col gap-4">
          <button
            className="w-full px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-md shadow"
            onClick={handleCreateRoom}
          >
            Crear Sala
          </button>
          <div className="flex gap-2 items-center">
            <input
              type="text"
              placeholder="Código de Invitación"
              value={codeInvite}
              onChange={e => setCodeInvite(e.target.value)}
              className="flex-1 bg-gray-700 border border-gray-600 rounded-md p-2 text-white"
            />
            <button
              className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-md shadow"
              onClick={handleJoin}
            >
              Unirse
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GeneradorCodigo;
