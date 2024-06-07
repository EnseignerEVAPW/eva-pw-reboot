import React from 'react';

const ChatComponent = ({ messages }) => {
  return (
    <div className="p-4 bg-gray-800 h-full text-white flex flex-col space-y-4 overflow-y-auto">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex ${
            msg.name === 'sujeto1' ? 'justify-start' : 'justify-end'
          }`}
        >
          <div
            className={`max-w-xs p-3 rounded-lg ${
              msg.name === 'sujeto1' ? 'bg-gray-700' : 'bg-green-600'
            }`}
          >
            <p>{msg.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatComponent;
