import React from 'react';

const Sidebar = ({ screens, currentScreenIndex, setCurrentScreenIndex }) => {
  return (
    <div className="w-1/6 h-full bg-gray-800 p-4 overflow-y-auto">
      <ul>
        {screens.map((screen, index) => (
          <li key={screen.date} className={`p-2 cursor-pointer ${currentScreenIndex === index ? 'bg-blue-500 text-white' : 'text-gray-400'}`} onClick={() => setCurrentScreenIndex(index)}>
            {screen.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
