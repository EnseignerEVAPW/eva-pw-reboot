import React, { useState, useEffect, useRef } from 'react';
import { Button } from './common/UIComponents';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';

function VideoConferenceComp({ codeRoom }) {
  const [id, setId] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [dataFromUser2, setDataFromUser2] = useState({
    name: '',
    content: '',
  });
  const apiRef = useRef(null);

  const convertRoom = (codeRoom) => {
    let roomNumString = '';
    for (let i = 0; i < codeRoom.length; i++) {
      let first = codeRoom.charCodeAt(i);
      let numbString = first % 10;
      roomNumString += numbString.toString();
    }
    const roomNumber = parseInt(roomNumString);
    return roomNumber;
  }
  useEffect(() => {
    const scriptId = 'jitsi';
    let script = document.getElementById(scriptId);

    findIdByName();
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://8x8.vc/vpaas-magic-cookie-15a65f78518d4474b1896c5505157fd8/external_api.js';
      script.async = true;
      document.body.appendChild(script);
    }

    const roomNumber = convertRoom(codeRoom);

    script.onload = () => {
      if (window.JitsiMeetExternalAPI) {
        apiRef.current = new window.JitsiMeetExternalAPI('8x8.vc', {
          roomName: `vpaas-magic-cookie-15a65f78518d4474b1896c5505157fd8/${roomNumber}`,
          parentNode: document.querySelector('#jaas-container'),
        });
        apiRef.current.on('incomingMessage', (event) => {
          console.log(`Message received from ${event.from}: ${event.message}`);
          setDataFromUser2({ name: event.from, content: event.message, userId:parseInt(idNumber) });
        });
      } else {
        console.error('JitsiMeetExternalAPI not loaded');
      }
    };

    return () => {
      if (apiRef.current) {
        apiRef.current.dispose();
        apiRef.current = null;
      }
    };
  }, []);

  const findIdByName = async () => {
    const tokenMine = sessionStorage.getItem('token');
    const decode = jwtDecode(tokenMine);
    console.log('decodeee', decode)
    await axios.get(`http://localhost:3000/users/${decode.username}`)
        .then((response)=> {
          setIdNumber(response.data.id);
          console.log("holaaa", response);
        })
        .catch((error) => {
          console.log(error);
        });
  }

  const handleUpdates = () => {
    const optionPatch = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataFromUser2)
    };

    fetch(`http://localhost:3000/chatLog/${id}`, optionPatch)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error("Error updating message: ", err));
  };

  const handleMessages = () => {
    const optionsPost = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataFromUser2)
    };

    fetch('http://localhost:3000/chatLog', optionsPost)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        setId(response.id);
      })
      .catch(err => console.error("Error posting message: ", err));
  };

  return (
    <div className="board-container flex flex-col h-full p-4 bg-gray-800 text-white rounded-lg shadow-lg">
      <div id="jaas-container" style={{ height: '90%' }} />
      <div className="flex justify-between p-4">
        <Button color="primary" onClick={handleMessages}>Guardar mensajes recibidos</Button>
        <Button color="primary" onClick={handleUpdates}>Actualizar mensajes</Button>
      </div>
    </div>
  );
}

export default VideoConferenceComp;
