import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = ({ onUsernameFetched }) => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No authentication token found.');
        return;
      }

      console.log('Token found:', token);

      try {
        const response = await axios.get('http://localhost:3000/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const fetchedUsername = response.data.username;
        setUsername(fetchedUsername);
        if (onUsernameFetched) {
          onUsernameFetched(fetchedUsername);
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchData();
  }, [onUsernameFetched]);
  return (
    <div>
      {username ? <p>{username}</p> : <></>}
    </div>
  );
};

export default UserProfile;
