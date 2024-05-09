// Train.js
import React from 'react';
import { Link } from 'react-router-dom';
import Board from '../components/view/Board';
import VideoConferenceComp from '../components/VideoConference'

// import './styles.css'; // Asegúrate de que la ruta es correcta

const Train = () => {
  const [codeInvite, setCodeInvite] = React.useState('');
  
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setCodeInvite(params.get('codeInvite'));
  }, []);

  return (
      <div className="container-fluid">
        <div className="flex flex-row gap-4">
          <div className="w-1/2">
            <VideoConferenceComp />
          </div>
          <div className="w-1/2">
            <div className="flex justify-center gap-4 mt-4">
              <Link to="#codeEditor" className="button">Editor de código</Link>
              <Link to="#pizarra" className="button">Pizarra virtual</Link>
            </div>
            <div id="codeEditor">
              <div className="codeEditor">
                {/* <iframe
                  height="700px"
                  src="https://onecompiler.com/embed?theme=dark"
                  width="100%"
                  className="rounded-lg border border-pink-8 shadow-md"></iframe> */}
              </div>
            </div>
            <div id="pizarra">
              <Board codeRoom={codeInvite} />
            </div>
            <div id="tags">
              <div id="hints-container">
                <button id="getHint-button">Get Hint</button>
                <div className="hint">2200</div>
                <div className="hint">Segment Tree</div>
                <div className="hint">Strings</div>
              </div>
              <div className="timer-hint">Next Hint available in 13 seconds</div>
            </div>
            <Link to="/feedback" className="button">TERMINAR</Link>
          </div>
        </div>
      </div>
  );
};

export default Train;
