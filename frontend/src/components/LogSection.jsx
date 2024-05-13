import React from 'react';
import { useNavigate } from 'react-router-dom';

function LogSection() {
  const navigate = useNavigate();

  const users = [
    {
      name: 'LanaDR',
      rating: 755,
      meetings: [
        {
          date: '15/06/2022',
          chat: `
Tutor: Hoy vamos a hablar sobre estructuras de datos.
Aprendiz: Genial, ¿por dónde empezamos?
Tutor: Comencemos con las listas enlazadas. Son una colección de nodos que juntos representan una secuencia.
Aprendiz: ¿Cuáles son las ventajas sobre los arrays?
Tutor: Principalmente, la inserción y eliminación de elementos es más eficiente en listas enlazadas.
Aprendiz: ¿Qué es un árbol de expansión mínima?
Tutor: Es un subconjunto de los bordes de un gráfico que conecta todos los vértices con el costo total mínimo posible.
Aprendiz: ¿Cómo funciona Kruskal?
Tutor: Ordena todos los bordes del gráfico por su peso y agrega los bordes al árbol de expansión, evitando ciclos.
`,
          image: '/img.png'
        },
        {
          date: '22/06/2022',
          chat: `
Tutor: En esta sesión, veremos el algoritmo de Kruskal para encontrar el árbol de expansión mínima.
Aprendiz: ¿Qué es un árbol de expansión mínima?
Tutor: Es un subconjunto de los bordes de un gráfico que conecta todos los vértices con el costo total mínimo posible.
Aprendiz: ¿Cómo funciona Kruskal?
Tutor: Ordena todos los bordes del gráfico por su peso y agrega los bordes al árbol de expansión, evitando ciclos.
          `,
          image: '/img.png'
        },
        {
          date: '29/06/2022',
          chat: `
Tutor: Hoy vamos a explorar el algoritmo KMP para la búsqueda de patrones.
Aprendiz: He oído que es más eficiente que el algoritmo de fuerza bruta. ¿Por qué?
Tutor: KMP utiliza la información de patrones ya buscados para evitar redundancias, reduciendo así la cantidad de comparaciones.
Aprendiz: ¿Podrías explicar cómo se construye la tabla de prefijos?
Tutor: Claro, la tabla de prefijos nos indica la siguiente posición de comparación en el patrón, basándose en los prefijos que coinciden con los sufijos.
          `,
          image: '/img.png'
        },
      ]
    },
    {
      name: 'ArtDeco',
      rating: 500,
      meetings: [
        {
          date: '15/06/2022',
          chat: `
Tutor: Hoy vamos a hablar sobre árboles binarios de búsqueda (BST).
Aprendiz: Excelente, ¿qué es un BST?
Tutor: Es una estructura de datos que mantiene sus elementos ordenados, permitiendo búsquedas, inserciones y eliminaciones eficientes.
Aprendiz: ¿Cómo se diferencia de un árbol binario regular?
Tutor: En un BST, para cada nodo, todos los elementos en el subárbol izquierdo son menores y en el subárbol derecho son mayores.
          `,
          image: '/img.png'
        },
        {
          date: '22/06/2022',
          chat: `
Tutor: Vamos a estudiar el algoritmo de Kruskal hoy.
Aprendiz: Perfecto, ¿cómo se usa en la práctica?
Tutor: Primero, ordenamos los bordes por su peso. Luego, agregamos los bordes uno por uno asegurándonos de no formar ciclos.
Aprendiz: ¿Qué estructuras de datos se utilizan comúnmente con Kruskal?
Tutor: Utilizamos el conjunto disjunto o union-find para gestionar y verificar los ciclos de manera eficiente.
          `,
          image: '/img.png'
        },
        {
          date: '29/06/2022',
          chat: `
Tutor: En esta sesión, veremos el algoritmo KMP.
Aprendiz: ¿Por qué es tan especial KMP?
Tutor: Porque evita recomparaciones de caracteres al buscar patrones, utilizando una tabla de prefijos.
Aprendiz: ¿Cómo se construye esta tabla?
Tutor: La tabla se construye analizando el patrón para determinar la mayor cantidad de coincidencias posibles que pueden ser reutilizadas.
          `,
          image: '/img.png'
        },
      ]
    },
  ];

  const handleUserClick = (user) => {
    navigate('/timeline', { state: { user } });
  };

  return (
    <div className="p-8 rounded-xl">
      <div className="text-xl mb-4 text-gray-300">BITÁCORA DE USUARIOS</div>
      {users.map(user => (
        <div 
          className="flex justify-between items-center p-3 bg-blue-800 rounded-lg mb-2 text-white cursor-pointer"
          key={user.name}
          onClick={() => handleUserClick(user)}
        >
          <div>{user.name}</div>
          <div>{user.rating}</div>
        </div>
      ))}
    </div>
  );
}

export default LogSection;
