import React from 'react';

function ActiveUser() {
  const usersRem = [
    { name: 'LanaDR', rating: 755 },
    { name: 'ArtDeco', rating: 500 },
    { name: 'OliviaR', rating: 515 },
    { name: 'FayeWe', rating: 680 },
    { name: 'ZoeHV', rating: 655 },
    { name: 'JennieL', rating: 700 },
    { name: 'Salvatoreeeee', rating: 637 },
    { name: 'NormanR', rating: 620 },
  ];
  const usersInactivos = [
    { name: 'Brooklyn', rating: 800 },
    { name: 'WhynGdOC', rating: 512 },
  ];

  return (
    <div className=" p-8 rounded-xl">
      <div className="text-xl mb-4 text-white">USUARIOS ACTIVOS</div>
      {usersRem.map(user => (
        <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg mb-2 text-white" key={user.name}>
          <div>{user.name}</div>
          <div>{user.rating}</div>
        </div>
      ))}
      <div className="text-xl mt-4 mb-4 text-white">USUARIOS INACTIVOS</div>
      {usersInactivos.map(user => (
        <div className="flex justify-between items-center p-3 border-2 border-blue-300 rounded-lg mb-2" key={user.name}>
          <div className="text-white">{user.name}</div>
          <div className="text-white">{user.rating}</div>
        </div>
      ))}
    </div>
  );
}

export default ActiveUser;
