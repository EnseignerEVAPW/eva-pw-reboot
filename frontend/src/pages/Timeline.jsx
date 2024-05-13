import React from 'react';
import { useLocation } from 'react-router-dom';

const Timeline = () => {
  const location = useLocation();
  const { user } = location.state || { user: { name: 'Unknown', meetings: [] } };

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Timeline for {user.name}</h1>
      <div className="bg-gray-800 p-4 rounded-lg text-white">
        {user.meetings.length > 0 ? (
          user.meetings.map((meeting, index) => (
            <div key={index} className="mb-2">
              {meeting}
            </div>
          ))
        ) : (
          <div>No meetings found for this user.</div>
        )}
      </div>
    </div>
  );
};

export default Timeline;
