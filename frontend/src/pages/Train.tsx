import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import VideoConferenceComp from '../components/VideoConference';
import Board from '../components/view/Board';

function TrainingPage() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const codeInvite = searchParams.get('codeInvite');
    const isCreator = searchParams.get('isCreator') === 'true';
    const navigate = useNavigate();

    const [view, setView] = useState('pizarra');
    const [showModal, setShowModal] = useState(isCreator);

    useEffect(() => {
        console.log("invitacion    " + codeInvite);
        const hasReloaded = localStorage.getItem('hasReloaded');
        if (!hasReloaded) {
            localStorage.setItem('hasReloaded', 'true');
            window.location.reload();
        }
    }, []);

    const handleFinish = () => {
        localStorage.removeItem('hasReloaded');
        navigate('/');
    };

    const handleCopyCode = () => {
        navigator.clipboard.writeText(codeInvite);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="container-fluid h-screen p-4 flex-grow">
            <div className="flex flex-col h-full flex-grow">
                <div className="flex gap-4 flex-row flex-grow">
                    <div className="flex flex-col w-2/5">
                        <VideoConferenceComp codeRoom={codeInvite} />
                        <div className="flex justify-around mt-4 space-x-4 flex-grow">
                            {isCreator && (
                                <div className="text-white">
                                    Código de la Sala: <span className="font-bold">{codeInvite}</span>
                                </div>
                            )}
                            <div className="flex space-x-4">
                                <button 
                                    className="px-4 py-2 rounded-md shadow text-white font-medium bg-gray-800 hover:bg-gray-600 transition duration-300 ease-in-out"
                                    onClick={handleCopyCode}>
                                    Copiar Código
                                </button>
                                <button 
                                    className="px-4 py-2 rounded-md shadow text-white font-medium bg-gray-800 hover:bg-gray-600 transition duration-300 ease-in-out"
                                    onClick={handleFinish}>
                                    Terminar
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="w-3/5 h-full flex flex-grow flex-col overflow-hidden">
                        <div className="flex flex-row justify-center gap-4 mb-4">
                            <button 
                                className="w-full px-4 py-2 rounded-md shadow text-white font-medium bg-gray-800 hover:bg-gray-600 transition duration-200 ease-in-out"
                                onClick={() => setView('editor')}>
                                Editor de código
                            </button>
                            <button 
                                style={{ backgroundColor: "#1F2937" }} 
                                className="w-full px-4 py-2 rounded-md shadow text-white font-medium bg-gray-800 hover:bg-gray-600 transition duration-200 ease-in-out"
                                onClick={() => setView('pizarra')}>
                                Pizarra virtual
                            </button>
                        </div>
                        <div id="pizarra" className={`${view === 'pizarra' ? 'visible' : 'hidden'}`}>
                            <Board codeRoom={codeInvite} />
                        </div>
                        <div id="codeEditor" className={`${view === 'editor' ? 'visible' : 'hidden'}`}>
                            <iframe
                                height="100%"
                                src="https://onecompiler.com/embed?theme=dark"
                                width="100%"
                                className="rounded-lg shadow-md"></iframe>
                        </div>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="fixed bottom-0 left-0 mb-7 ml-7 bg-black rounded-lg bg-opacity-50 z-500">
                    <div className="bg-gray-300 p-6 rounded-lg shadow-lg text-black w-72">
                        <h2 className="text-xl mb-4">Compartir Código</h2>
                        <p className="mb-4">Puedes compartir el siguiente código para que un participante pueda unirse:</p>
                        <div className="flex justify-between items-center mb-4">
                            <span className="font-bold">{codeInvite}</span>
                            <button
                                className="ml-4 px-4 py-2 bg-blue-700 hover:bg-blue-500 text-white rounded-md"
                                onClick={handleCopyCode}
                            >
                                Copiar Código
                            </button>
                        </div>
                        <button
                            className="w-full px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-md"
                            onClick={handleCloseModal}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TrainingPage;
