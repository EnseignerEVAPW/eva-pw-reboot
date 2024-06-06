import React, { useState } from 'react';
import Comment from './Comment';
import Circle from './Circle';
import Line from './Line';

const Compete = () => {
  const [comments, setComments] = useState([]);

  const handleScreenClick = (e) => {
    // Verificar si el clic ocurrió en el fondo, no en un comentario existente
    if (e.target.classList.contains('bg-gray-800')) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const newComment = {
        x,
        y,
        commentX: x + 20,  // Ajuste la posición inicial del comentario
        commentY: y + 20,  // Ajuste la posición inicial del comentario
        text: '',
        id: Date.now(),
      };
      setComments([...comments, newComment]);
    }
  };

  const handleDeleteComment = (id) => {
    setComments(comments.filter(comment => comment.id !== id));
  };

  const handleDragComment = (id, x, y) => {
    setComments(comments.map(comment => 
      comment.id === id ? { ...comment, commentX: x, commentY: y } : comment
    ));
  };

  return (
    <div className="relative h-screen bg-gray-800" onClick={handleScreenClick}>
      {comments.map((comment) => (
        <React.Fragment key={comment.id}>
          <Circle x={comment.x} y={comment.y} />
          <Line from={{ x: comment.x, y: comment.y }} to={{ x: comment.commentX, y: comment.commentY }} />
          <Comment comment={comment} onDelete={handleDeleteComment} onDrag={handleDragComment} />
        </React.Fragment>
      ))}
    </div>
  );
};

export default Compete;
