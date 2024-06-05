import { useEffect, useState } from 'react';
import InviteSearch from '../components/InviteSearch';
import {useProfile} from '../services/useProfile';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface UserEach{
  username: string,
  isCoach: boolean,
}

interface Team {
  id: number,
  name: string,
  members: UserEach[],
}
const header = 'text-base bg-[#141d30] py-2 text-center rounded-lg font-medium text-indigo-200'

const Teams = () => {
  const [allTeams, setAllTeams] = useState<Team[]>([]);
  const { id } = useProfile();
  const navigate = useNavigate();

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

  const viewReport = (team) => {
    navigate('/timeline', { state: { team } });
  }
  return (
    <div className="grid grid-cols-3 gap-4 p-10 flex-wrap">
      <div className="col-span-2">
        <div className='grid grid-cols-6 gap-4 mb-3'>
          <div className={header}>Nombre team</div>
          <div className={`col-span-4 ${header}`}>Participantes</div>
          <div className={header}>Ver mas</div>
        </div>
        {allTeams && allTeams.map((team) => (
          <div key={team.id} className='grid grid-cols-6 gap-4 mb-2'>
            <div className='flex items-center justify-center col-span-1 text-base bg-indigo-200 py-2 rounded-lg'>{team.name}</div>
            <div className='col-span-4 text-base bg-indigo-200 py-2 text-center rounded-lg flex justify-center'>
              {team.members.map((user) => (
                <div key={user.username} className='p-2'>
                  {user.isCoach ?
                    (<div className='w-16 h-16 rounded-full flex items-center justify-center text-xl font-semibold border-2 border-indigo-700 bg-blue-300'>
                      {user.username.charAt(0).toUpperCase()}
                    </div>) :
                    (<div className='w-16 h-16 rounded-full flex items-center justify-center text-xl font-semibold border-2 border-indigo-700'>
                      {user.username.charAt(0).toUpperCase()}
                    </div>)
                  }
                  <div>{user.username}</div>
                </div>
              ))}
            </div>
            <div className='flex items-center justify-center col-span-1 text-base bg-indigo-200 text-center rounded-lg'>
              <button className='items-center h-auto bg-violet-500 hover:bg-violet-600 active:bg-violet-700 text-center px-4 rounded text-white' onClick={()=>viewReport(team)}>Ver team</button>
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
