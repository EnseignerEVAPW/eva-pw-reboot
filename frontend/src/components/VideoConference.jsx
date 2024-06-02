import React, { useState, useEffect, useRef } from 'react';
import { Button } from './common/UIComponents';
import axios from 'axios';

function VideoConferenceComp({ codeRoom }) {
  const [chatHistory, setChatHistory] = useState([]);
  const [localUserName, setLocalUserName] = useState('Yo');
  const [localUserId, setLocalUserId] = useState(null);
  const [participants, setParticipants] = useState({});
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
  };

  useEffect(() => {

    const scriptId = 'jitsi';
    let script = document.getElementById(scriptId);

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

        apiRef.current.on('videoConferenceJoined', (event) => {
          console.log('videoConferenceJoined event:', event);
          const localDisplayName = event.displayName;
          setLocalUserName(localDisplayName);
          const localUserId = apiRef.current.getMyUserId();
          setLocalUserId(localUserId);
          const participantsInfo = apiRef.current.getParticipantsInfo();
          const participantNames = {};
          participantsInfo.forEach(participant => {
            participantNames[participant.participantId] = participant.displayName || 'Anonymous';
          });
          setParticipants(participantNames);
        });

        apiRef.current.on('participantJoined', (event) => {
          setParticipants(prev => ({
            ...prev,
            [event.id]: event.displayName || 'Anonymous'
          }));
        });

        apiRef.current.on('participantLeft', (event) => {
          setParticipants(prev => {
            const newParticipants = { ...prev };
            delete newParticipants[event.id];
            return newParticipants;
          });
        });

        apiRef.current.on('displayNameChange', (event) => {
          setParticipants(prev => ({
            ...prev,
            [event.id]: event.displayname || 'Anonymous'
          }));
        });

        apiRef.current.on('incomingMessage', (event) => {
          setChatHistory(prevHistory => [
            ...prevHistory,
            { id: event.from, content: event.message }
          ]);
        });

        apiRef.current.on('outgoingMessage', (event) => {
          setChatHistory(prevHistory => [
            ...prevHistory,
            { id: localUserId, content: event.message }
          ]);
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
  }, [codeRoom]);

  const handlePrintMessages = async() => {
    const messagesWithNames = chatHistory.map(msg => ({
      name: participants[msg.id] || (msg.id === localUserId ? localUserName : 'Unknown'),
      content: msg.content
    }));
    console.log(messagesWithNames);
    try{
      const token = sessionStorage.getItem('token');
      if(!token){
        return;
      }
      const response = await axios.patch(`http://localhost:3000/training/${codeRoom}/chat`, messagesWithNames, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('Chat actualizado:', response.data);
    }catch(error){
      console.log("error al actualizar el chat");
    }
    
  };

  return (
    <div className="board-container flex flex-col h-full p-4 bg-gray-800 text-white rounded-lg shadow-lg">
      <div id="jaas-container" style={{ height: '90%' }} />
      <div className="flex justify-between p-4">
        <Button color="primary" onClick={handlePrintMessages}>Obtener mensajes</Button>
      </div>
    </div>
  );
}

export default VideoConferenceComp;
