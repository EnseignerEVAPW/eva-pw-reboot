import { useEffect, useState } from 'react';
import { useProfile } from '../services/useProfile';
import Calendar from '../components/view/Calendar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const userInfo = {
  username: 'callao_william',
  country: 'Bolivia',
  status: 'Other',
  email: 'callao_william@gmail.com',
  description: '...',
  totalProblemsSolved: '150',
  highestRating: '2200',
};

const rankings = [
  { user: 'SofiaC0de', rating: 2500 },
  { user: 'AlexLoop', rating: 2450 },
  { user: 'CodeNinjaEdu', rating: 2400 },
  { user: 'JuanAlgo', rating: 2350 },
  { user: 'LambdaLisa', rating: 2300 },
  { user: 'BitMasterOli', rating: 2250 },
  { user: 'VectorVic', rating: 2200 },
];

const backgroundColor = 'bg-gray-800';
const textColor = 'text-[#E0E0E0]';
const highlightColor = 'text-[#87C5FD]';
const borderColor = 'border-gray-800';

const Profile = () => {
  const navigate = useNavigate();
  const { username } = useProfile();
  const [country, setCountry] = useState('No definido');
  const [status, setStatus] = useState('No definido');
  const [email, setEmail] = useState('No definido');
  const [firstName, setFirstName] = useState('');
  const [contribution, setContribution] = useState(0);
  const [rating, setRating] = useState('No definido');

  const navigateTeams = () => {
    navigate('/teams');
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/codeforces/info/${username}`);
        console.log('my data', response);
        const result = response.data.result[0];
        setCountry(result.country ?? country);
        setStatus(response.data.status);
        setEmail(result.email ?? email);
        setFirstName(result.firstName ?? firstName);
        setContribution(result.contribution);
        setRating(result.rating ?? rating);
      } catch (error) {
        console.error("This is the error: ", error);
      }
    }
    getData();
  }, [username]);

  return (
    <>
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 p-10 pb-0 ${textColor}`}>
        <div className={`user-info rounded-lg p-6 mb-4 border ${borderColor} shadow-md ${backgroundColor}`}>
          <div className={`flex flex-wrap items-center space-x-4 mb-4 justify-between`}>
            <div className='flex gap-y-2.5'>
              <div
                className={`w-24 h-24 rounded-full flex items-center justify-center text-4xl font-semibold border-2 highlightColor`}
              >
                {username.charAt(0).toUpperCase()}
              </div>
              <div className='px-5'>
                <h2 className={`text-2xl font-semibold ${highlightColor}`}>{username}</h2>
                <p className="text-sm">{country}</p>
                <p className="text-sm">{email}</p>
              </div>
            </div>
            <div className='flex'>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={navigateTeams}>Equipos</button>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-4">
            <p className="mb-2"><strong className={`${highlightColor}`}>Status:</strong> {status}</p>
            <p className="mb-2"><strong className={`${highlightColor}`}>Nombre:</strong> {firstName}</p>
            <p className="mb-2">
              <strong className={`${highlightColor}`}>Contribution: </strong>
              {contribution}
            </p>
            <p><strong className={`${highlightColor}`}>Rating: </strong> {rating}</p>
          </div>
        </div>  
      </div>
      <div className={`p-6 m-10 rounded-lg border ${borderColor} shadow-md mt-4 ${textColor} ${backgroundColor}`}>
        <Calendar name={username} />
      </div>
    </>
  );
}

export default Profile;
