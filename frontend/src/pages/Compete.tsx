import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import Comment from './Comment';
import Circle from './Circle';
import Line from './Line';

const Compete = forwardRef((props, ref) => {
  const [comments, setComments] = useState([]);

  useImperativeHandle(ref, () => ({
    serializeComments,
    loadComments
  }));

  useEffect(() => {
    const handleResize = () => {
      setComments(prevComments => prevComments.map(comment => ({
        ...comment,
        x: (comment.xPercentage * window.innerWidth) / 100,
        y: (comment.yPercentage * window.innerHeight) / 100,
        commentX: (comment.commentXPercentage * window.innerWidth) / 100,
        commentY: (comment.commentYPercentage * window.innerHeight) / 100,
      })));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleScreenClick = (e) => {
    if (e.target.classList.contains('clickable-area')) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xPercentage = (x / window.innerWidth) * 100;
      const yPercentage = (y / window.innerHeight) * 100;
      const commentXPercentage = ((x + 20) / window.innerWidth) * 100;
      const commentYPercentage = ((y + 20) / window.innerHeight) * 100;

      const newComment = {
        id: Date.now(),
        user: "Usuario1",
        x,
        y,
        xPercentage,
        yPercentage,
        commentX: x + 20,
        commentY: y + 20,
        commentXPercentage,
        commentYPercentage,
        text: ''
      };
      setComments([...comments, newComment]);
    }
  };

  const handleDeleteComment = (id) => {
    setComments(comments.filter(comment => comment.id !== id));
  };

  const handleDragComment = (id, x, y) => {
    setComments(comments.map(comment => 
      comment.id === id ? { 
        ...comment, 
        commentX: x, 
        commentY: y,
        commentXPercentage: (x / window.innerWidth) * 100,
        commentYPercentage: (y / window.innerHeight) * 100 
      } : comment
    ));
  };

  const handleUpdateText = (id, newText) => {
    setComments(comments.map(comment =>
      comment.id === id ? { ...comment, text: newText } : comment
    ));
  };

  const serializeComments = () => {
    return JSON.stringify(comments.map(comment => ({
      id: comment.id,
      user: comment.user,
      text: comment.text,
      xPercentage: comment.xPercentage,
      yPercentage: comment.yPercentage,
      commentXPercentage: comment.commentXPercentage,
      commentYPercentage: comment.commentYPercentage
    })));
  };

  const loadComments = (loadedComments) => {
    const deserializedComments = loadedComments.map(comment => ({
      ...comment,
      x: (comment.xPercentage * window.innerWidth) / 100,
      y: (comment.yPercentage * window.innerHeight) / 100,
      commentX: (comment.commentXPercentage * window.innerWidth) / 100,
      commentY: (comment.commentYPercentage * window.innerHeight) / 100,
    }));
    setComments(deserializedComments);
  };

  return (
    <div className="absolute inset-0 clickable-area" onClick={handleScreenClick}>
      {comments.map((comment) => (
        <React.Fragment key={comment.id}>
          <Circle x={comment.x} y={comment.y} />
          <Line from={{ x: comment.x, y: comment.y }} to={{ x: comment.commentX, y: comment.commentY }} />
          <Comment comment={comment} onDelete={handleDeleteComment} onDrag={handleDragComment} onUpdateText={handleUpdateText} />
        </React.Fragment>
      ))}
    </div>
  );
});

export default Compete;
