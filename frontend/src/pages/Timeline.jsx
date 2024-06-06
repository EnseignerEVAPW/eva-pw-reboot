import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Timeline = () => {
  const location = useLocation();
  const { team } = location.state || { team: { name: 'Unknown', meetings: [] } };
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/training/teamsTraining/${team.id}`);
        setMeetings(response.data);
      } catch (error) {
        console.error('El error es: ', error);
      }
    };
    loadData();
  }, [team.id]);

  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48 py-8 text-white bg-gradient-to-r from-gray-800 to-gray-900 min-h-screen">
      <h1 className="text-4xl mb-8 font-bold text-center animate-fadeIn">Timeline - {team.name}</h1>
      {meetings && meetings.length > 0 ? (
        meetings.map((meeting) => (
          <div
            key={meeting.id}
            className="bg-gray-800 p-6 rounded-lg mb-6 shadow-lg transform transition-all duration-300 hover:scale-102 hover:bg-gray-700"
          >
            <div className="flex mb-4">
              <div className="w-1/6 text-left text-gray-400">
                <div className="text-lg font-semibold">{meeting.creationDate.slice(0, 10)}</div>
              </div>
              <div className="w-5/6 flex items-start justify-between">
                <div className="w-3/4 p-2 border border-gray-700 rounded-md h-48 overflow-y-auto bg-gray-900 text-sm">
                  {meeting.chat && meeting.chat.map((each) => (
                    <pre key={each.id} className="whitespace-pre-wrap leading-tight">{each.name}: {each.content}</pre>
                  ))}
                </div>
                <div className="w-1/4 ml-4">
                  <img src={meeting.image} alt="Imagen de la reunión" className="rounded-md h-48 w-full object-cover border border-gray-700" />
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No meetings found.</p>
      )}
    </div>
  );
};

export default Timeline;
