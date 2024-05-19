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
LanaDR: Hoy estuve leyendo sobre estructuras de datos. ¿Te interesa discutir sobre eso?
ElTurista: ¡Claro! ¿Por dónde quieres empezar?
LanaDR: Estaba pensando en las listas enlazadas.
ElTurista: He oído hablar de ellas. ¿Qué ventajas tienen sobre los arrays?
LanaDR: Bueno, son más eficientes en la inserción y eliminación de elementos.
ElTurista: Interesante. Y, ¿sabes qué es un árbol de expansión mínima?
LanaDR: Sí, es un subconjunto de los bordes de un gráfico que conecta todos los vértices con el costo total mínimo posible.
ElTurista: ¿Y cómo funciona el algoritmo de Kruskal?
LanaDR: Ordena todos los bordes del gráfico por su peso y agrega los bordes al árbol de expansión, evitando ciclos.
                `,
                image: '/img.png'
            },
            {
                date: '22/06/2022',
                chat: `
LanaDR: ElTurista, hoy me gustaría hablar sobre el algoritmo de Kruskal.
ElTurista: Perfecto. Lo recuerdo vagamente. ¿Puedes explicármelo otra vez?
LanaDR: Claro. Es un algoritmo para encontrar el árbol de expansión mínima de un gráfico.
ElTurista: ¿Cómo funciona exactamente?
LanaDR: Primero, ordenamos todos los bordes por su peso. Luego, vamos agregando los bordes al árbol, asegurándonos de no formar ciclos.
ElTurista: Me suena bien. ¿Podrías darme un ejemplo de cómo se hace?
LanaDR: Sí, podemos hacer un ejercicio juntos después de esta charla.
                `,
                image: '/img.png'
            },
            {
                date: '29/06/2022',
                chat: `
LanaDR: Hoy estuve revisando el algoritmo KMP para la búsqueda de patrones. ¿Lo conoces?
ElTurista: Sí, algo he escuchado. Dicen que es más eficiente que el algoritmo de fuerza bruta.
LanaDR: Exacto. KMP utiliza la información de patrones ya buscados para evitar redundancias, reduciendo así la cantidad de comparaciones.
ElTurista: ¿Y cómo se construye la tabla de prefijos?
LanaDR: La tabla de prefijos nos indica la siguiente posición de comparación en el patrón, basándose en los prefijos que coinciden con los sufijos.
ElTurista: Parece complicado, pero suena útil. Deberíamos hacer algunos ejercicios.
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
ArtDeco: Oye, ElTurista, ¿te gustaría hablar sobre los árboles binarios de búsqueda (BST)?
ElTurista: ¡Claro, ArtDeco! Siempre estoy interesado en aprender más sobre estructuras de datos.
ArtDeco: Un BST es una estructura que mantiene sus elementos ordenados, permitiendo búsquedas, inserciones y eliminaciones eficientes.
ElTurista: ¿Y en qué se diferencia de un árbol binario regular?
ArtDeco: En un BST, para cada nodo, todos los elementos en el subárbol izquierdo son menores y en el subárbol derecho son mayores.
ElTurista: Suena bastante útil. ¿Podríamos ver algunos ejemplos?
ArtDeco: Sí, vamos a hacer unos diagramas después de esta charla.
                `,
                image: '/img.png'
            },
            {
                date: '22/06/2022',
                chat: `
ArtDeco: Estuve leyendo sobre el algoritmo de Kruskal hoy. ¿Te gustaría repasarlo juntos?
ElTurista: Claro, ArtDeco. Me vendría bien un repaso. ¿Cómo se usa en la práctica?
ArtDeco: Primero, ordenamos los bordes por su peso. Luego, agregamos los bordes uno por uno, asegurándonos de no formar ciclos.
ElTurista: ¿Qué estructuras de datos se utilizan comúnmente con Kruskal?
ArtDeco: Utilizamos el conjunto disjunto o union-find para gestionar y verificar los ciclos de manera eficiente.
ElTurista: Excelente. Hagamos unos ejercicios después.
                `,
                image: '/img.png'
            },
            {
                date: '29/06/2022',
                chat: `
ArtDeco: ElTurista, hoy estuve estudiando el algoritmo KMP. ¿Quieres repasarlo conmigo?
ElTurista: ¡Sí, claro! He escuchado que KMP es bastante eficiente.
ArtDeco: Lo es. Evita recomparaciones de caracteres al buscar patrones, utilizando una tabla de prefijos.
ElTurista: ¿Podrías explicarme cómo se construye esa tabla?
ArtDeco: La tabla se construye analizando el patrón para determinar la mayor cantidad de coincidencias posibles que pueden ser reutilizadas.
ElTurista: Muy interesante. Deberíamos practicarlo con algunos ejemplos.
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
