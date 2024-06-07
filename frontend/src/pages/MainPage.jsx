import React, { useState, useEffect } from "react";
import ChatComponent from "./ChatComponent";
import Comment from "./Comment";
import Circle from "./Circle";
import Line from "./Line";
import img from "./img.png";
import "./styles.css"; // Importing the CSS file for styling

const MainPage = () => {
  const data = [
    {
      creationDate: "2024-06-06 13:19:45",
      teamId: 1,
      chat: [
        { name: "sujeto1", content: "hey" },
        { name: "sujeto2", content: "whats up" },
        { name: "sujeto2", content: "all good?" },
        { name: "sujeto1", content: "yhea" },
        { name: "sujeto1", content: "cold" },
        { name: "sujeto1", content: "my ... es soo nas" },
        { name: "sujeto2", content: "wtf" },
        { name: "sujeto1", content: "hey" },
        { name: "sujeto2", content: "whats up" },
        { name: "sujeto2", content: "all good?" },
        { name: "sujeto1", content: "yhea" },
        { name: "sujeto1", content: "cold" },
        { name: "sujeto1", content: "my ... es soo nas" },
        { name: "sujeto2", content: "wtf" },
      ],
      id: "1grqr47",
      comments: [
        {
          id: 1717780034748,
          user: "Usuario1",
          text: "",
          xPercentage: 41.521778916544655,
          yPercentage: 14.874815905743741,
          commentXPercentage: 32.40643301610542,
          commentYPercentage: 13.549337260677467,
        },
        {
          id: 1717780036652,
          user: "Usuario1",
          text: "",
          xPercentage: 70.80435578330893,
          yPercentage: 24.447717231222384,
          commentXPercentage: 32.55284590043924,
          commentYPercentage: 34.46244477172312,
        },
        {
          id: 1717780038812,
          user: "Usuario1",
          text: "",
          xPercentage: 56.1630673499268,
          yPercentage: 62.297496318114874,
          commentXPercentage: 8.907165080527086,
          commentYPercentage: -4.418262150220913,
        },
      ],
    },
    {
      creationDate: "2024-06-07 10:20:56",
      teamId: 1,
      chat: [
        { name: "sujeto3", content: "hola" },
        { name: "sujeto4", content: "¿qué tal?" },
      ],
      id: "Guym143",
      comments: [
        {
          id: 1717780116028,
          user: "Usuario1",
          text: "sip",
          xPercentage: 13.445964494875549,
          yPercentage: 54.63917525773196,
          commentXPercentage: 13.079932284040996,
          commentYPercentage: 32.54786450662739,
        },
      ],
    },
    {
      creationDate: "2024-06-05 17:06:23",
      teamId: 1,
      chat: [
        { name: "sujeto5", content: "buenos días" },
        { name: "sujeto6", content: "¿cómo estás?" },
      ],
      id: "uyfGR9s",
      comments: [
        {
          id: 1717780164884,
          user: "Usuario1",
          text: "ooooooo",
          xPercentage: 63.48371156661786,
          yPercentage: 4.860088365243005,
          commentXPercentage: 36.72561310395315,
          commentYPercentage: 5.007363770250368,
        },
        {
          id: 1717780167732,
          user: "Usuario1",
          text: "qqqqqqqq",
          xPercentage: 56.1630673499268,
          yPercentage: 15.463917525773196,
          commentXPercentage: 27.648014275256223,
          commentYPercentage: 37.4079528718704,
        },
      ],
    },
  ];
  const [comments, setComments] = useState([]);
  const [chatData, setChatData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(data[0].creationDate);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    loadScreenData(selectedDate);
  }, [selectedDate]);

  const handleSaveComments = () => {
    const commentsJSON = serializeComments();
    console.log(commentsJSON);
  };

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

  const serializeComments = () => {
    return JSON.stringify(
      comments.map((comment) => ({
        id: comment.id,
        user: comment.user,
        text: comment.text,
        xPercentage: comment.xPercentage,
        yPercentage: comment.yPercentage,
        commentXPercentage: comment.commentXPercentage,
        commentYPercentage: comment.commentYPercentage,
      }))
    );
  };

  const loadComments = (loadedComments) => {
    const deserializedComments = loadedComments.map((comment) => ({
      ...comment,
      x: (comment.xPercentage * window.innerWidth) / 100,
      y: (comment.yPercentage * window.innerHeight) / 100,
      commentX: (comment.commentXPercentage * window.innerWidth) / 100,
      commentY: (comment.commentYPercentage * window.innerHeight) / 100,
    }));
    setComments(deserializedComments);
  };

  const loadScreenData = (date) => {
    const screenData = data.find((item) => item.creationDate === date);
    setChatData(screenData.chat);
    loadComments(screenData.comments);
  };

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
  }, [comments]);

  return (
    <div className="relative w-full h-screen flex justify-center items-center px-40 py-20">
      <div
        className={`absolute left-0 top-0 h-full flex flex-col justify-center items-start p-4 date-list ${
          isHovered ? "date-list" : "date-list-hidden"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {data.map((item) => (
          <div
            key={item.creationDate}
            className={`p-2 mb-2 cursor-pointer rounded-lg ${
              item.creationDate === selectedDate
                ? "bg-blue-500 text-white"
                : "bg-white/10 text-gray-300"
            }`}
            onClick={() => setSelectedDate(item.creationDate)}
          >
            {new Date(item.creationDate).toLocaleDateString()}
          </div>
        ))}
      </div>
      <div className="w-full max-w-7xl h-full bg-gray-700 rounded-lg flex flex-col">
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
      </div>
      <button
        onClick={handleSaveComments}
        className="absolute bottom-4 right-4 p-2 bg-blue-500 text-white rounded"
      >
        Guardar Comentarios
      </button>
    </div>
  );
};

export default MainPage;
