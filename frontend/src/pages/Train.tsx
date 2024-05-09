import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import VideoConferenceComp from '../components/VideoConference';
import Board from '../components/view/Board';
import { Button } from '../components/common/UIComponents';

function TrainingPage() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const codeInvite = searchParams.get('codeInvite');

    useEffect(() => {
        const hasReloaded = localStorage.getItem('hasReloaded');
        if (!hasReloaded) {
            localStorage.setItem('hasReloaded', 'true');
            window.location.reload();
        }
    }, []);

    return (
        <div className="container-fluid h-screen p-4 flex-grow">
            <div className="flex flex-col h-full flex-grow">
                <div className="flex gap-4 flex-row flex-grow">
                    <div className="flex flex-col w-2/5">
                        <VideoConferenceComp />
                        <div className="flex justify-around mt-4 space-x-4 flex-grow">
                            <Button color="#1E40AF" fullWidth={true} onClick={() => {}}>Guardar Mensajes</Button>
                            <Button color="#1F2937" fullWidth={true} onClick={() => {}}>Actualizar</Button>
                            <Button color="#1F2937" fullWidth={true} onClick={() => {}}>Terminar</Button>
                        </div>
                    </div>
                    <div className="w-3/5 h-full flex flex-grow flex-col overflow-hidden">
                        <div className="flex flex-row justify-center gap-4 mb-4">
                            <Button color="#1F2937" fullWidth={true} onClick={() => {}}>Editor de código</Button>
                            <Button color="#1F2937" fullWidth={true} onClick={() => {}}>Pizarra virtual</Button>
                        </div>
                        <div id="pizarra" className="flex-grow">
                            <Board codeRoom={codeInvite} />
                        </div>
                        {/* codemir */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TrainingPage;
