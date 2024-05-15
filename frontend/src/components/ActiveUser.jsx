import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ActiveUser() {
  const [ActiveUsers, setActiveUsers] = useState([]);
  const [InactiveUsers, setInactiveUsers] = useState([]);

  useEffect(() => {
    getOnline();
    getOffline();
  }, []);
  
  const getOnline = async () => {
    await axios.get('http://localhost:3000/users/online')
      .then((response) => {
        setActiveUsers(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getOffline = async () => {
    await axios.get('http://localhost:3000/users/offline')
      .then((response) => {
        setInactiveUsers(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  


  return (
    <div className=" p-8 rounded-xl">
      <div className="text-xl mb-4 text-white">USUARIOS ACTIVOS</div>
      {ActiveUsers.map(user => (
        <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg mb-2 text-white" key={user.name}>
          <div>{user.username}</div>
          <div>12345</div>
        </div>
      ))}
      <div className="text-xl mt-4 mb-4 text-white">USUARIOS INACTIVOS</div>
      {InactiveUsers.map(user => (
        <div className="flex justify-between items-center p-3 border-2 border-blue-300 rounded-lg mb-2" key={user.name}>
          <div className="text-white">{user.username}</div>
          <div className="text-white">00000</div>
        </div>
      ))}
    </div>
  );
}

export default ActiveUser;
