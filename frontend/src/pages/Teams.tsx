import { useEffect, useState } from 'react';
import InviteSearch from '../components/InviteSearch';

const teams = [
  { name: 'ejemplito', users: ['Lana1', 'Tomato2', 'Desire']},
  { name: 'ejemplito2', users: ['Top12', 'Tomato2', 'Ejemplo2'] },
  { name: 'ejemplito3', users: ['Tomato2', 'Hola2', 'Desire'] },
];

const header = 'text-base bg-[#141d30] py-2 text-center rounded-lg font-medium text-indigo-200'

const Teams = () => {
  const [allTeams, setAllTeams ] = useState([]);
  useEffect(()=>{
    
  },[])
  return (
    <div className="grid grid-rows-3 grid-cols-6 gap-4 m-10">
      <div className="row-span-3 col-span-4">
        <div className='grid grid-cols-6 gap-4 mb-3'>
          <div className={header}>Nombre team</div>
          <div className={`col-span-3 ${header}`}>Participantes</div>
        </div>
        {teams.map((team) => (
          <div key={team.name} className='grid grid-cols-6 gap-4 mb-2'>
            <div className='text-base bg-indigo-200 py-2 text-center rounded-lg'>{team.name}</div>
            <div className='col-span-3 text-base bg-indigo-200 py-2 text-center rounded-lg flex justify-center'>
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
          </div>
        ))}
      </div>
      <div className="row-span-3 col-span-2">
        <InviteSearch />
      </div>
    </div>
  );
};

export default Teams;
