import { useState } from 'react';
import '../../../public/styles/BeCoach.css';
import axios from 'axios';

const CoachForm = ({show, onClose}) => {
  const [name, setName] = useState("");
  const [name2, setName2] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [coach, setCoach] = useState("");  //nos interesa el id
  const [coachId, setCoachId] = useState(""); //nos interesa el id

  const encontrarIdCoach = async (coach) => {
    try {
      const response = await axios.get(`http://localhost:3000/users/${coach}`);
      setCoachId(response.data.id);
    }catch(error) {
      alert('Error al encontrar el id del coach');
      console.error('Error:', error);
    }
  }

  const updateRole = async (id) => {
    try {
      const response = await axios.put(`http://localhost:3000/users/${id}`, {
        role: "COACH",
      });
      console.log(response.data.message);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const registerAll = async (e) => {
    console.log(name, password, role, coach);
    e.preventDefault();
    encontrarIdCoach(coach);
    //BUSCAR EL NUMERO DE ID DEL COACH EN BACKEND
    ///verificar tokens
    updateRole(coachId);
    //verificar que el coach exista y hacerlo coach porque todos son users al principio
    try {
      const response1 = await axios.post('http://localhost:3000/users', {
        name: name,
        password: password,
        role: "USER",
        coachId: coachId,
      });
      alert(response1.data.message);
      const response2 = await axios.post('http://localhost:3000/users', {
        name: name2,
        password: password,
        role: "USER",
        coachId: coachId,
      });
      alert(response1.data.message);
      alert(response2.data.message);
    }catch (error) {
      alert('Error al registrar usuario');
      console.error('Error:', error);
    }
  };

  return (
    <div className={`modal ${show ? "show" : ""}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close text-2xl text-indigo-200" onClick={onClose}>&times;</span>
        <form>
          <div className="container flex flex-col px-10">
            <h1 className="text-2xl text-indigo-200 font-bold text-center">Registro de Coach</h1>
            <hr className="my-5"/>
            <label htmlFor="name" className="text-indigo-300 mb-2 font-medium"><b>Nombre</b></label>
            <input className="mb-5 rounded px-3" type="text" placeholder="Ingresa tu nombre" name="name" required onChange={(e) => setName(e.target.value)}/>
            <label htmlFor="name2" className="text-indigo-300 mb-2 font-medium"><b>Nombre par</b></label>
            <input className="mb-5 rounded px-3" type="text" placeholder="Ingresa el nombre de tu par" name="name2" required onChange={(e) => setName2(e.target.value)}/>
            <label htmlFor="password" className="text-indigo-300 mb-2 font-medium"><b>Contraseña</b></label>
            <input className="mb-5 rounded px-3" type="password" placeholder="Ingresa tu contraseña" name="password" required onChange={(e) => setPassword(e.target.value)} />
            <label htmlFor="coach" className="text-indigo-300 mb-2 font-medium"><b>Coach</b></label> 
            <input className="mb-5 rounded px-3" type="text" placeholder="Ingresa el nombre de tu coach" name="coach" required onChange={(e) => setCoach(e.target.value)} />
            <div className ="w-min h-min bg-indigo-500 px-5 text-indigo-50 rounded-lg">
              <button type="submit" onClick={registerAll}>Registrar</button>
            </div>
          </div>
        </form>
      </div>
    </div>  
  );
};

export default CoachForm;