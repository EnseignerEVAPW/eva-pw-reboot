import React, { useState, useEffect } from 'react';
import ChatComponent from './ChatComponent';
import Comment from './Comment';
import Circle from './Circle';
import Line from './Line';
import img from './img.png';

const MainPage = () => {
  const initialComments = [{"id":1717770968791,"user":"Usuario1","text":"","xPercentage":13.226345168374817,"yPercentage":53.75552282768778,"commentXPercentage":-6.392981332357247,"commentYPercentage":33.726067746686304},{"id":1717770971863,"user":"Usuario1","text":"","xPercentage":19.302479868228403,"yPercentage":38.733431516936676,"commentXPercentage":30.86909773060029,"commentYPercentage":56.84830633284241},{"id":1717770982442,"user":"Usuario1","text":"","xPercentage":19.302479868228403,"yPercentage":7.80559646539028,"commentXPercentage":38.26294838945827,"commentYPercentage":9.572901325478647}];

  const chatData = [
    { name: 'sujeto1', content: 'hey' },
    { name: 'sujeto2', content: 'whats up' },
    { name: 'sujeto2', content: 'all good?' },
    { name: 'sujeto1', content: 'yhea' },
    { name: 'sujeto1', content: 'cold' },
    { name: 'sujeto1', content: 'my ... es soo nas' },
    { name: 'sujeto2', content: 'wtf' },
    { name: 'sujeto1', content: 'hey' },
    { name: 'sujeto2', content: 'whats up' },
    { name: 'sujeto2', content: 'all good?' },
    { name: 'sujeto1', content: 'yhea' },
    { name: 'sujeto1', content: 'cold' },
    { name: 'sujeto1', content: 'my ... es soo nas' },
    { name: 'sujeto2', content: 'wtf' },
  ];

  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (initialComments) {
      loadComments(initialComments);
    }
  }, []);

  const handleSaveComments = () => {
    const commentsJSON = serializeComments();
    console.log(commentsJSON);
  };

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
  }, [comments]);

  return (
    <div className="relative w-full h-screen bg-gray-900 flex justify-center items-center px-40 py-20">
      <div className="w-full max-w-7xl h-full bg-gray-700 p-4 rounded-lg flex">
        <div className="w-1/3 h-full bg-gray-800 overflow-y-auto z-10 rounded-l-lg">
          <ChatComponent messages={chatData} />
        </div>
        <div 
          className="w-2/3 h-full relative clickable-area z-20 rounded-r-lg" 
          style={{ backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          onClick={handleScreenClick}
        >
          {comments.map((comment) => (
            <React.Fragment key={comment.id}>
              <Circle x={comment.x} y={comment.y} />
              <Line from={{ x: comment.x, y: comment.y }} to={{ x: comment.commentX, y: comment.commentY }} />
              <Comment comment={comment} onDelete={handleDeleteComment} onDrag={handleDragComment} onUpdateText={handleUpdateText} />
            </React.Fragment>
          ))}
        </div>
      </div>
      <button onClick={handleSaveComments} className="absolute bottom-4 right-4 p-2 bg-blue-500 text-white rounded">Guardar Comentarios</button>
    </div>
  );
};

export default MainPage;
