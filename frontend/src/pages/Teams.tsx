import { useEffect, useState } from 'react';
import InviteSearch from '../components/InviteSearch';
import {useProfile} from '../services/useProfile';
import axios from 'axios';

const teams = [
  { name: 'ejemplito', users: ['Lana1', 'Tomato2', 'Desire'] },
  { name: 'ejemplito2', users: ['Top12', 'Tomato2', 'Ejemplo2'] },
  { name: 'ejemplito3', users: ['Tomato2', 'Hola2', 'Desire'] },
];

const header = 'text-base bg-[#141d30] py-2 text-center rounded-lg font-medium text-indigo-200'

const Teams = () => {
  const [allTeams, setAllTeams] = useState([]);
  const { id } = useProfile();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('el id es', id);
        if(id){
          const response = await axios.get(`http://localhost:3000/team/getTeamsBelong/${id}`);
          console.log(response);  
          setAllTeams(response.data);
        }
        
      } catch (error) {
        console.error("El error es: ", error);
      }
    }
    fetchData();
  }, [id])

  return (
    <div className="grid grid-cols-3 gap-4 p-10 flex-wrap">
      <div className="col-span-2">
        <div className='grid grid-cols-6 gap-4 mb-3'>
          <div className={header}>Nombre team</div>
          <div className={`col-span-4 ${header}`}>Participantes</div>
          <div className={header}>Ver mas</div>
        </div>
        {teams.map((team) => (
          <div key={team.name} className='grid grid-cols-6 gap-4 mb-2'>
            <div className='flex items-center justify-center col-span-1 text-base bg-indigo-200 py-2 rounded-lg'>{team.name}</div>
            <div className='col-span-4 text-base bg-indigo-200 py-2 text-center rounded-lg flex justify-center'>
              {team.users.map((user) => (
                <div key={user} className='p-2'>
                  {user === 'Tomato2' ?
                    (<div className='w-16 h-16 rounded-full flex items-center justify-center text-xl font-semibold border-2 border-indigo-700 bg-blue-300'>
                      {user.charAt(0).toUpperCase()}
                    </div>) :
                    (<div className='w-16 h-16 rounded-full flex items-center justify-center text-xl font-semibold border-2 border-indigo-700'>
                      {user.charAt(0).toUpperCase()}
                    </div>)
                  }
                  <div>{user}</div>
                </div>
              ))}
            </div>
            <div className='flex items-center justify-center col-span-1 text-base bg-indigo-200 text-center rounded-lg'>
              <button className='items-center h-auto bg-violet-500 hover:bg-violet-600 active:bg-violet-700 text-center px-4 rounded text-white'>Ver team</button>
            </div>
          </div>
        ))}
      </div>
      <div className="col-span-1">
        <InviteSearch />
      </div>
    </div>
  );
};

export default Teams;
