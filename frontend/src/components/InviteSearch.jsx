import { useState, useEffect } from 'react';
import axios from 'axios';
import {useProfile} from '../services/useProfile';

function InviteSearch() {
  const {username, id} = useProfile();
  const [name, setName] = useState('');
  const [search, setSearch] = useState('');
  const [students, setStudents] = useState([]);
  const [studentsFound, setStudentsFound] = useState([]);
  const [team, setTeam] = useState([]);
  const [teamId, setTeamId] = useState('');

  const saveName = async (e) => {
    e.preventDefault();
    try {
      // Realizar la llamada POST al backend para crear el equipo
      const response = await axios.post('http://localhost:3000/team', {
        nombre: name,
        coachId: 1 // ID del entrenador, cambiar por el ID del usuario logueado
      });
  
      if (response.status === 201) {
        const teamId = response.data.id;
        setTeamId(teamId); // Actualizar el estado del ID del equipo
        console.log('Equipo creado:', response.data);
        console.log('ID del equipo:', teamId);
        document.querySelector('#team-name').style.display = 'none';
        document.querySelector('#invite-search').style.display = 'block';
      }
    } catch (error) {
      console.error('Error al crear el equipo:', error);
    }


    document.querySelector('#team-name').style.display = 'none';
    document.querySelector('#invite-search').style.display = 'block';
  };

  const searchStudent = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const autocomplete = (e) => {
    e.preventDefault();
    setSearch(e.target.innerText);
  };

  const inviteTeam = async (e) => {
    e.preventDefault();
    team.push(search);
    // BACKEND invite search to team
    try {
      // cambiar el team 6 por el team id
      const response = await axios.post(`http://localhost:3000/team/6/invite/${search}`);
      console.log("respuesta  "+response);
    } catch (error) {
      console.log(error);
    }

    setSearch('');
  };

  const finishProcess = (e) => {
    e.preventDefault();
    console.log(search);
    //BACKEND
    window.location.reload();
  }

  useEffect(() => {
    document.querySelector('#team-name').style.display = 'block';
    document.querySelector('#invite-search').style.display = 'none';
    const getStudents = async () => {
      const response = await axios.get('http://localhost:3000/users/all');
      const names = response.data.map((student) => student);
      setStudents(names);
    }
    getStudents();
  }, []);

  useEffect(() => {
    const filteredStudents = students.filter((stud) =>
      stud.username.toLowerCase().includes(search.toLowerCase()) && search.trim() !== ''
    );
    setStudentsFound(filteredStudents);
  }, [search, students]);

  return (
    <div className="bg-[#0e1420] px-10 py-5">
      <div id="team-name">
        <div className="text-2xl text-indigo-200 font-bold text-center mb-5">Agregar team</div>
        <div>
          <form onSubmit={saveName}>
            <div className="container flex flex-col px-10 my-5">
              <label htmlFor="name" className="text-indigo-300 mb-2 font-medium"><b>Nombre team</b></label>
              <input className="mb-5 rounded px-3" type="text" placeholder="Ingresa el nombre de tu equipo" name="name" required onChange={(e) => setName(e.target.value)} />
              <div className="w-min h-min bg-indigo-500 px-5 text-indigo-50 rounded-lg">
                <button type="submit">Registrar</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div id="invite-search">
        <div className="text-2xl text-blue-300 font-bold text-center mb-5">Invitar al team</div>
        <div>
          <form action="">
            <div className="container flex flex-col px-10 my-5">
              <label htmlFor="student" className="text-blue-300 mb-2 font-medium"><b>Nombre usuario</b></label>
              <input className="mb-5 rounded px-3" type="text" placeholder="Ingresa el nombre de usuario" name="student" value={search} required onChange={searchStudent} />
              <div className='flex flex-row justify-between'>
                <div className="w-min h-min bg-blue-500 px-5 text-blue-50 rounded-lg">
                  <button type="submit" onClick={inviteTeam}>Invitar</button>
                </div>
                <div className="w-min h-min bg-blue-500 px-5 text-blue-50 rounded-lg">
                  <button type="submit" onClick={finishProcess}>Concluir</button>
                </div>
              </div>
            </div>
          </form>
        </div>
        {studentsFound.length === 0 && <div className="text-blue-300 text-center">No se encontraron estudiantes</div>}
        {studentsFound.length > 0 &&
          <div className="container flex flex-col px-10 my-5">
            {studentsFound.map((student) => (
              <div key={student.id} className="flex flex-row justify-between border-2 border-indigo-100 rounded-lg px-5  my-2">
                <button className="text-indigo-100" onClick={autocomplete}>{student.username}</button>
              </div>
            ))}
          </div>}
        <div className='container flex flex-col bg-black rounded-lg my-5'>
          <div className="text-2xl text-indigo-400 font-bold text-center mt-2">Team</div>
          {team.length === 0 && <div className="text-indigo-400 text-center">No hay estudiantes en el team</div>}
          {team.length > 0 &&
            <div className="container flex px-10 my-5">
              {team.map((student) => (
                <div key={student} className="flex flex-row justify-between border-2 border-indigo-400 rounded-lg px-5 m-2">
                  <button className="text-indigo-300">{student}</button>
                </div>
              ))}
            </div>}
        </div>
      </div>
    </div>
  );
}

export default InviteSearch;