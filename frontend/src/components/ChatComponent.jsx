import React from 'react';

const ChatComponent = ({ messages }) => {
  if (messages.length === 0) return null;

  const firstUser = messages[0].name;

  return (
    <div className="p-4 bg-[#111827] h-full text-white flex flex-col space-y-4 overflow-y-auto w-full">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex ${
            msg.name === firstUser ? 'justify-start' : 'justify-end'
          } w-full`}
        >
          <div className="flex flex-col max-w-full">
            <span
              className={`text-sm ${
                msg.name === firstUser ? 'text-[#4D6AA0]' : 'text-[#4D96A0]'
              } mb-1`}
            >
              {msg.name}
            </span>
            <div
              className={`max-w-full p-3 rounded-lg ${
                msg.name === firstUser ? 'bg-[#4D6AA0]' : 'bg-[#4D96A0]'
              }`}
            >
              <p className="leading-tight">{msg.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatComponent;
