import React, {useEffect, useState} from 'react';
import { mix, motion } from 'framer-motion';
import '../../public/styles/Home.css';

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [cursorVariant, setCursorVariant] = useState('default');

  const variants = {
    default: {
      x : mousePosition.x - 10,
      y : mousePosition.y - 10 > 68 ? mousePosition.y - 100 : 68,
    },
    text: {
      height: 150,
      width: 150,
      x : mousePosition.x - 75,
      y : mousePosition.y - 75 > 68 ? mousePosition.y - 75 : 68,
      backgroundColor: 'rgba(205, 185, 255, 0.4)',
      border: '3px solid #CDB9FF',
    },
    text2: {
      height: 60,
      width: 60,
      x : mousePosition.x - 10,
      y : mousePosition.y - 10 > 68 ? mousePosition.y - 10 : 68,
      backgroundColor: 'black',
      border: '3px solid white',
      mixBlendMode: 'difference',
    }
  }

  const textEnter = () => {
    setCursorVariant('text');
  }

  const textEnter2 = () => {
    setCursorVariant('text2');
  };
  const textLeave = () => {
    setCursorVariant('default');
  }

  useEffect(()=> {
    const mouseMoveHandler = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    }
    window.addEventListener('mousemove',mouseMoveHandler);
    return () => {
      window.removeEventListener('mousemove', mouseMoveHandler);
    }
  }, []);
  return (
    <div className="body-text">
      <div className="container2">
        <div className="firstwrapper text-center">
          <h1 className="title1" onMouseEnter={textEnter} onMouseLeave={textLeave}>Welcome to <span>P2P Learning!</span></h1>
          <p className="subtitle">The platform to improve your programming skills</p>
        </div>
        <div className="secondwrapper text-center">
          <h2 className="title2" onMouseEnter={textEnter2} onMouseLeave={textLeave}>How it works?</h2>
          <p className="subtitle">You can compete with your friends, train with our exercises, and learn the rules of the competitions</p>
        </div>
        <motion.div className="cursor" variants={variants} animate={cursorVariant}></motion.div>
      </div>
    </div>
  );
}

export default Home;