import React from 'react';

function Button({ children, onClick, color, fullWidth, className }) {
    const baseStyle = "px-4 py-2 rounded-md shadow text-white font-medium transition duration-300 ease-in-out";
    let colorStyle = "";
    let hoverColor = "";

    if (color === "primary") {
        colorStyle = "bg-blue-700 hover:bg-blue-800";
    } else {
        colorStyle = `bg-[${color}] hover:bg-[${shadeColor(color, -10)}]`;
    }

    const fullWidthStyle = fullWidth ? "w-full" : "";

    return (
        <button
            style={{ backgroundColor: color, borderColor: color }}
            className={`${baseStyle} ${colorStyle} ${hoverColor} ${fullWidthStyle} ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

function shadeColor(color, percent) {
    let R = parseInt(color.substring(1, 3), 16);
    let G = parseInt(color.substring(3, 5), 16);
    let B = parseInt(color.substring(5, 7), 16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R < 255) ? R : 255;
    G = (G < 255) ? G : 255;
    B = (B < 255) ? B : 255;

    const RR = ((R.toString(16).length === 1) ? "0" + R.toString(16) : R.toString(16));
    const GG = ((G.toString(16).length === 1) ? "0" + G.toString(16) : G.toString(16));
    const BB = ((B.toString(16).length === 1) ? "0" + B.toString(16) : B.toString(16));

    return `#${RR}${GG}${BB}`;
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
