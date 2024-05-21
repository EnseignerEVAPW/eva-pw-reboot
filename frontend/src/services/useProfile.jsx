import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function useProfile() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.getItem('token');
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
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchData();
  }, []);
  return username;
}
