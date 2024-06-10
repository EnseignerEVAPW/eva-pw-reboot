import React, { useState, useEffect, useRef } from "react";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import { debounce } from 'lodash';
import ChatComponent from "../components/ChatComponent";
import Comment from "../components/Comment";
import Circle from "../components/Circle";
import Line from "../components/Line";
import img from "./img.png";
import "../../public/styles/Training.css";

const generateUniqueId = () => {
  return Math.random().toString(36).substring(2, 12) + Math.random().toString(36).substring(2, 12).slice(0, 10);
};

const Training = () => {
  const location = useLocation();
  const { team } = location.state || { team: { id: null, name: 'Unknown', meetings: [] } };
  const [comments, setComments] = useState([]);
  const [chatData, setChatData] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const isUnmounting = useRef(false);
  const [feedback, setFeedback] = useState(
    // Ejemplo de datos de feedback
    {
      comment: 'Muy buen ejercicio, me ayudó mucho.',
      satisfaction: 8,
      time: '36minutos 4 horas 23 segundos'
    }
  );
  const debounceSave = useRef(debounce(async (comments) => {
    await saveComments(comments);
  }, 3000)).current;

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/training/teamsTraining/${team.id}`);
        const sortedTrainings = response.data.sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate));
        setTrainings(sortedTrainings);
        if (sortedTrainings.length > 0) {
          setSelectedDate(sortedTrainings[0].creationDate);
        }
      } catch (error) {
        console.error("Error loading training data:", error);
      }
    };
    if (team.id) {
      loadData();
    }
  }, [team.id]);

  useEffect(() => {
    if (selectedDate) {
      loadScreenData(selectedDate);
    }
  }, [selectedDate, trainings]);

  useEffect(() => {
    if (!isUnmounting.current && comments.length > 0) {
      debounceSave(comments);
    }
  }, [comments, debounceSave]);

  useEffect(() => {
    const handleResize = () => {
      setComments((prevComments) =>
        prevComments.map((comment) => ({
          ...comment,
          x: (comment.xPercentage * window.innerWidth) / 100,
          y: (comment.yPercentage * window.innerHeight) / 100,
          commentX: (comment.commentXPercentage * window.innerWidth) / 100,
          commentY: (comment.commentYPercentage * window.innerHeight) / 100,
        }))
      );
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    return () => {
      isUnmounting.current = true;
      saveComments(comments);
    };
  }, [comments]);

  const handleScreenClick = (e) => {
    if (e.target.classList.contains("clickable-area")) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xPercentage = (x / window.innerWidth) * 100;
      const yPercentage = (y / window.innerHeight) * 100;
      const commentXPercentage = ((x + 20) / window.innerWidth) * 100;
      const commentYPercentage = ((y + 20) / window.innerHeight) * 100;

      const newComment = {
        id: generateUniqueId(),
        user: "Usuario1",
        x,
        y,
        xPercentage,
        yPercentage,
        commentX: x + 20,
        commentY: y + 20,
        commentXPercentage,
        commentYPercentage,
        text: "",
      };
      setComments([...comments, newComment]);
    }
  };

  const handleDeleteComment = (id) => {
    setComments(comments.filter((comment) => comment.id !== id));
  };

  const handleDragComment = (id, x, y) => {
    setComments(
      comments.map((comment) =>
        comment.id === id
          ? {
            ...comment,
            commentX: x,
            commentY: y,
            commentXPercentage: (x / window.innerWidth) * 100,
            commentYPercentage: (y / window.innerHeight) * 100,
          }
          : comment
      )
    );
  };

  const handleUpdateText = (id, newText) => {
    setComments(
      comments.map((comment) =>
        comment.id === id ? { ...comment, text: newText } : comment
      )
    );
  };

  const serializeComments = (comments) => {
    return comments.map((comment) => ({
      id: comment.id,
      text: comment.text,
      author: comment.user,
      xPercentage: comment.xPercentage,
      yPercentage: comment.yPercentage,
      commentXPercentage: comment.commentXPercentage,
      commentYPercentage: comment.commentYPercentage,
    }));
  };

  const saveComments = async (comments) => {
    const serializedComments = serializeComments(comments);
    try {
      if (selectedDate) {
        const training = trainings.find((item) => item.creationDate === selectedDate);
        if (training) {
          await axios.patch(`http://localhost:3000/training/${training.id}/comments`, {
            comments: serializedComments,
          });
        }
      }
    } catch (error) {
      console.error("Error saving comments:", error);
    }
  };

  const loadComments = (loadedComments) => {
    const deserializedComments = loadedComments.map((comment) => ({
      ...comment,
      id: generateUniqueId(),
      x: (comment.xPercentage * window.innerWidth) / 100,
      y: (comment.yPercentage * window.innerHeight) / 100,
      commentX: (comment.commentXPercentage * window.innerWidth) / 100,
      commentY: (comment.commentYPercentage * window.innerHeight) / 100,
    }));
    setComments(deserializedComments);
  };

  const loadScreenData = async (date) => {
    const screenData = trainings.find((item) => item.creationDate === date);
    if (screenData) {
      setComments([]);
      setChatData([]);
      setChatData(screenData.chat || []);
      try {
        const response = await axios.get(`http://localhost:3000/training/${screenData.id}`);
        loadComments(response.data.comments.comments || []);
      } catch (error) {
        console.error("Error loading comments:", error);
      }
    }
  };

  const getEmoji = (value) => {
    if (value <= 2) return '😞';
    if (value <= 4) return '😐';
    if (value <= 7) return '😊';
    else return '😃';
  }

  return (
    <div className="relative w-full h-screen flex justify-center items-center px-40 py-20">
      <div
        className={`absolute left-0 top-0 h-full flex flex-col justify-center items-start p-4 date-list ${isHovered ? "date-list" : "date-list-hidden"
          }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {trainings.map((item) => (
          <div
            key={item.creationDate + item.creationTime}
            className={`p-2 mb-2 cursor-pointer rounded-lg ${item.creationDate === selectedDate
                ? "bg-blue-500 text-white"
                : "bg-white/10 text-gray-300"
              }`}
            onClick={async () => {
              setSelectedDate(item.creationDate);
              await loadScreenData(item.creationDate);
            }}
          >
            <div>{new Date(item.creationDate).toLocaleDateString()}</div>
            <div className="text-sm">{new Date(item.creationDate).toLocaleTimeString()}</div>
          </div>
        ))}
      </div>
      <div className="w-full max-w-7xl h-full rounded-lg flex flex-col">
        <div className="absolute left-1/2 transform -translate-x-1/2 top-4 text-white z-10 opacity-50">
          {new Date(selectedDate).toLocaleDateString()}
        </div>
        <div className="flex flex-1 h-full">
          <div className="w-1/3 h-full bg-gray-800 rounded-l-lg flex overflow-hidden">
            <ChatComponent messages={chatData} />
          </div>
          <div
            className="w-2/3 h-full relative clickable-area z-10 rounded-r-lg"
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              flexDirection: 'column',
            }}
            onClick={handleScreenClick}
          >
            {comments.map((comment) => (
              <React.Fragment key={comment.id}>
                <Circle x={comment.x} y={comment.y} />
                <Line
                  from={{ x: comment.x, y: comment.y }}
                  to={{ x: comment.commentX, y: comment.commentY }}
                />
                <Comment
                  comment={comment}
                  onDelete={handleDeleteComment}
                  onDrag={handleDragComment}
                  onUpdateText={handleUpdateText}
                />
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="w-2/4 justify-self-center bg-gray-800 p-3 mt-2 rounded-lg">
          <h2 className="text-white">Feedback de los Estudiantes</h2>
          <div className="flex justify-between">
            <div className="bg-gray-700 p-2 my-1 rounded-lg text-white">
              <p><strong>Comentario:</strong> {feedback.comment}</p>
              <p><strong>Tiempo:</strong> {feedback.time}</p>
            </div>
            <div> 
            <span className="text-5xl">{getEmoji(feedback.satisfaction)}</span>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default Training;
