import React , { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import VideoConferenceComp from '../components/VideoConference';
import Board from '../components/view/Board';
// import '../../public/styles.css';

function TrainingPage() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const codeInvite = searchParams.get('codeInvite');
  
    useEffect(() => {
        const hasReloaded = localStorage.getItem('hasReloaded');
        if (!hasReloaded) {
            localStorage.setItem('hasReloaded', 'true');
            setTimeout(() => {
                window.location.reload();
            },0);
        }
    }, []);

    return (
        <div className="container-fluid">
            <h1>Entrenar</h1>
            <p>P2P Learning</p>
            <div className="flex flex-row gap-4">
                <div className="w-1/2">
                    <VideoConferenceComp />
                </div>
                <div className="w-1/2">
                    <div className="flex justify-center gap-4 mt-4">
                        <a href="#codeEditor" className="button">Editor de código</a>
                        <a href="#pizarra" className="button">Pizarra virtual</a>
                    </div>
                    {/* <div id="codeEditor">
                        <div className="codeEditor">
                            <iframe
                                height="700px"
                                src="https://onecompiler.com/embed?theme=dark"
                                width="100%"
                                className="rounded-lg border border-pink-8 shadow-md"></iframe>
                        </div>
                    </div> */}
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
                    <a href="/feedback" className="button">TERMINAR</a>
                </div>
            </div>
        </div>
    );
}

export default TrainingPage;
