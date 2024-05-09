// tldraw-sockets-example - Implementa tldraw con partykit-websockets
// Copyright (C) 2024 David Sheldrick y Steve Ruiz

// Este programa es software libre: puedes redistribuirlo y/o modificarlo
// bajo los términos de la GNU General Public License como es publicado por
// la Free Software Foundation, ya sea la versión 3 de la Licencia, o
// (a tu elección) cualquier versión posterior.

// Este programa se distribuye con la esperanza de que sea útil,
// pero SIN NINGUNA GARANTÍA; sin incluso la garantía implícita de
// COMERCIABILIDAD o APTITUD PARA UN PROPÓSITO PARTICULAR. Vea la
// GNU General Public License para más detalles.

import React, { useState } from 'react';
import { Tldraw } from 'tldraw';
import 'tldraw/tldraw.css';
import { usePartyStore } from '../../services/usePartyStore';
import NameEditor from '../common/NameEditor';
import '../../../public/styles/Board.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from '../common/UIComponents';

const HOST_URL = 'localhost:1999';

function Board({ codeRoom }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();
    const store = usePartyStore({
        roomId: `example1${codeRoom}`,
        hostUrl: HOST_URL,
    });

    const handleFileUpload =(event) =>{
        const file = event.target.files[0];
        if(file){
            setSelectedFile(file);
        }else{
            console.log("File not found");
        }
    };

    const saveInDataBase =  async() => {
        try{
            const random = parseInt(Math.random()*2000);
            const formData = new FormData();
            formData.append('file', selectedFile, `image.png`);

            const response = await axios.post('http://localhost:3000/images/upload', formData,{
                headers:{
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Saved succesfully');
        }catch(e){
            console.error('fallo', e);
        }
    }

    return (
        <div className="board-container flex flex-col h-full   text-white  shadow-lg">
            <div className= "flex flex-col h-full bg-gray-800 p-4 rounded-lg">
                <Tldraw
                    store={store}
                    components={{ SharePanel: NameEditor }}
                    className="flex-grow"
                />
            </div>
            <div className="flex justify-between items-center mt-4 gap-4">
                <div className="flex justify-between">
                    <input type='file' className="file-input w-ful rounded-lg cursor-pointer" onChange={handleFileUpload} />
                </div>
                <Button onClick={saveInDataBase} fullWidth={true} color="#1E40AF">
                    GUARDAR
                </Button>
                <Button onClick={() => navigate('/imagenes')} fullWidth={true} color="#1F2937">
                    VER GUARDADOS
                </Button>
            </div>
        </div>
    );
}

export default Board;
