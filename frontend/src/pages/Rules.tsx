import React, { useEffect, useRef } from 'react';
import twemoji from 'twemoji';


const rulesData = [
  {
    icon: '😊', // Emoji correspondiente a 'i-twemoji-grinning-face-with-smiling-eyes'
    title: 'Desafíos de Programación:',
    description: 'Los participantes deben resolver problemas de programación utilizando el lenguaje de programación seleccionado.',
  },
  {
    icon: '🤨', // Emoji correspondiente a 'i-twemoji-face-with-raised-eyebrow'
    title: 'Puntuación por Desafío:',
    description: 'Cada desafío tiene un puntaje asociado que indica su dificultad. Los participantes ganan puntos al resolver los desafíos correctamente.',
  },
  {
    icon: '⏰', // Emoji correspondiente a 'i-twemoji-alarm-clock'
    title: 'Restricciones de Tiempo:',
    description: 'Por lo general, hay un límite de tiempo para resolver cada desafío. Los participantes deben completar la solución dentro de este tiempo para obtener puntos completos.',
  },
  {
    icon: '😎', // Emoji correspondiente a 'i-twemoji-smiling-face-with-sunglasses'
    title: 'Soluciones Eficientes:',
    description: 'Además de producir una solución correcta, se valora la eficiencia del código. Soluciones más eficientes pueden recibir bonificaciones de puntos.',
  },
  {
    icon: '🐥', // Emoji correspondiente a 'i-twemoji-baby-chick'
    title: 'Colaboración Limitada:',
    description: 'En competiciones individuales, se espera que los participantes trabajen de forma independiente sin colaboración externa.',
  },
  {
    icon: '😾', // Emoji correspondiente a 'i-twemoji-pouting-cat'
    title: 'Sobre el plagio:',
    description: 'Cualquier intento de plagio de soluciones, puede resultar en la descalificación del participante.',
  },
];

// const backgroundColor = 'bg-[#1F2937]';
// const textColor = 'text-[#E0E0E0]';
// const highlightColor = 'text-[#87C5FD]';
const hoverEffect = 'hover:text-[#87C5FD]';
const containerBgColor = 'bg-[#1F2937]';  // Fondo de cada regla
const textColor = 'text-[#E0E0E0]';  // Color de texto
const highlightColor = 'text-[#87C5FD]';  // Color de texto destacado
const fontSize = 'text-base';  // Tamaño de la fuente
const Rule = ({ icon, title, description }) => {
  const emojiRef = useRef(null);

  useEffect(() => {
    if (emojiRef.current) {
      twemoji.parse(emojiRef.current, {
        folder: 'svg',
        ext: '.svg'
      });
    }
  }, []);

  return (
    <div className="rule bg-[#1F2937] text-[#E0E0E0] p-4 my-2 rounded-lg flex items-center">
      <div ref={emojiRef} className="flex-shrink-0 text-6xl w-1/12" style={{ fontSize: '3rem' }}>{icon}</div>
      <div className="w-11/12 pl-4">
        <strong className="text-[#87C5FD]">{title}</strong>
        <p>{description}</p>
      </div>
    </div>
  );
};

const Rules = () => (
  <div className="centrado2 min-h-screen p-5">
    {rulesData.map((rule, index) => (
      <Rule key={index} {...rule} />
    ))}
  </div>
);

export default Rules;