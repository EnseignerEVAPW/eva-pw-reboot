import React from 'react';
import { useNavigate } from 'react-router-dom';

function LogSection() {
  const navigate = useNavigate();

  const users = [
    { name: 'LanaDR', rating: 755, meetings: ['Meeting 1', 'Meeting 2'] },
    { name: 'ArtDeco', rating: 500, meetings: ['Meeting 3'] },
    { name: 'OliviaR', rating: 515, meetings: ['Meeting 4', 'Meeting 5'] },
  ];

  const handleUserClick = (user) => {
    navigate('/timeline', { state: { user } });
  };

  return (
    <div className="p-8 rounded-xl">
      <div className="text-xl mb-4 text-gray-300">BITÁCORA DE USUARIOS</div>
      {users.map(user => (
        <div 
          className="flex justify-between items-center p-3 bg-blue-800 rounded-lg mb-2 text-white cursor-pointer"
          key={user.name}
          onClick={() => handleUserClick(user)}
        >
          <div>{user.name}</div>
          <div>{user.rating}</div>
        </div>
      ))}
    </div>
  );
}

export default LogSection;
