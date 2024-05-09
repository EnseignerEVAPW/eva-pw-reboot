import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function GeneradorCodigo() {
  const [codeInvite, setCodeInvite] = useState('');
  const navigate = useNavigate();

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

  const handleJoin = () => {
    localStorage.removeItem('hasReloaded');
    navigate(`/entrenar?codeInvite=${codeInvite}`);
  }

  return (
    <div className="p-8">
      <div className="text-lg text-white mb-3">INVITAR USUARIO</div>
      <div className="p-4 rounded-xl bg-gray-800">
        <div className="flex justify-between items-center gap-2">
          <input
            type="text"
            value={codeInvite}
            onChange={e => setCodeInvite(e.target.value)}
            className="flex-1 bg-blue-50 border border-gray-300 rounded-md p-2 text-gray-800"
          />
          <button
            className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-md shadow"
            onClick={generateCode}
          >
            Generar enlace
          </button>
          <button
            className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-md shadow"
            onClick={handleJoin}
          >
            Unirse
          </button>
        </div>
      </div>
    </div>
  );
}

export default GeneradorCodigo;
