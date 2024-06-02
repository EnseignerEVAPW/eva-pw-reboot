import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function GeneradorCodigo() {
  const [codeInvite, setCodeInvite] = useState('');
  const [navigateOnCode, setNavigateOnCode] = useState(false);
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (navigateOnCode && codeInvite) {
      console.log('Código de invitación generado:', codeInvite);
      localStorage.setItem('isCreator', true);
      navigate(`/entrenar?codeInvite=${codeInvite}&isCreator=true`);
    }
  }, [codeInvite, navigateOnCode, navigate]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const token = sessionStorage.getItem('token');
        if (!token) {
          console.error('No token found in sessionStorage');
          return;
        }
        const response = await axios.get('http://localhost:3000/team/my-teams', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (Array.isArray(response.data)) {
          setTeams(response.data);
        } else {
          setTeams([]);
        }
      } catch (error) {
        console.error('Error al obtener los equipos:', error);
        setTeams([]);
      }
    };

    fetchTeams();
  }, []);

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
    return result;
  }

  const handleCreateRoom = async () => {
    
    if (!selectedTeam) {
      alert('Por favor, selecciona un equipo para continuar.');
      return;
    }
    localStorage.removeItem('hasReloaded');
    const codigo = generateCode();
    console.log("probando todo este mambfo  "+codigo);
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        console.error('No token found in sessionStorage');
        return;
      }

      const response = await axios.post('http://localhost:3000/training', {
        id: codigo,
        teamId: selectedTeam,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Entrenamiento registrado:', response.data);
    } catch (error) {
      console.error('Error al registrar el entrenamiento:', error);
      return;
    }

    setNavigateOnCode(true);
  };

  const handleJoin = () => {
    localStorage.removeItem('hasReloaded');
    localStorage.removeItem('isCreator');
    
    navigate(`/entrenar?codeInvite=${codeInvite}`);
  };

  return (
    <div className="p-8 rounded-xl shadow-lg">
      <div className="text-xl mb-4 text-gray-300">SALA DE ENTRENAMIENTO</div>
      <div className="p-4 rounded-xl bg-gray-800">
        <h2 className="text-2xl font-semibold text-gray-300 mb-4">Obtén un vínculo para compartir</h2>
        <p className="mb-6 text-gray-300">
          Haz clic en <span className="font-bold">Crear Sala</span> para obtener un vínculo que puedas enviar a las personas con quienes quieras reunirte.
        </p>
        <div className="flex flex-col gap-4">
          <select
            value={selectedTeam}
            onChange={e => setSelectedTeam(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
          >
            <option value="">Selecciona un equipo</option>
            {teams.map(team => (
              <option key={team.id} value={team.id}>
                {team.nombre}
              </option>
            ))}
          </select>
          <button
            className={`w-full px-4 py-2 text-white rounded-md shadow ${
              selectedTeam ? 'bg-blue-700 hover:bg-blue-800' : 'bg-gray-500 cursor-not-allowed'
            }`}
            onClick={handleCreateRoom}
            disabled={!selectedTeam}
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
