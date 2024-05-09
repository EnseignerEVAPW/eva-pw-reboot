import React from 'react';

function Button({ children, onClick, color }) {
  const baseStyle = "px-4 py-2 rounded-md shadow text-white font-medium";
  const colorStyle = color === "primary" ? "bg-blue-700 hover:bg-blue-800" : "bg-pink-500 hover:bg-pink-600";
  return (
    <button className={`${baseStyle} ${colorStyle}`} onClick={onClick}>
      {children}
    </button>
  );
}

function TextInput({ value, onChange }) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      className="min-w-[200px] bg-blue-50 border border-gray-300 rounded-md p-2 flex items-center"
    />
  );
}

export { Button, TextInput };
