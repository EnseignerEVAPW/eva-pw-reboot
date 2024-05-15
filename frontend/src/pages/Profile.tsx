// Profile.js
import React from 'react';
import UserProfile from '../services/useProfile';
import Calendar from '../components/view/Calendar';
import { useNavigate } from 'react-router-dom';

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
  const navigateTeams = () => {
    navigate('/teams');
  };
  return (
    <>
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 p-10 pb-0 ${textColor}`}>
        <div className={`user-info rounded-lg p-6 mb-4 border ${borderColor} shadow-md ${backgroundColor}`}>
          <div className={`flex items-center space-x-4 mb-4 justify-between`}>
            <div className='flex gap-y-2.5'>
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center text-4xl font-semibold border-2 ${borderColor}"
              >
                {userInfo.username.charAt(0).toUpperCase()}
              </div>
              <div className='mx-10'>
                <h2 className={`text-2xl font-semibold ${highlightColor}`} ><UserProfile /></h2>
                <p className="text-sm">{userInfo.country}</p>
                <p className="text-sm">{userInfo.email}</p>
              </div>
            </div>
            <div className='justify-self-end'>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={navigateTeams}>Equipos</button>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-4">
            <p className="mb-2"><strong className={`${highlightColor}`}>Status:</strong> {userInfo.status}</p>
            <p className="mb-2"><strong className={`${highlightColor}`}>Description:</strong> {userInfo.description}</p>
            <p className="mb-2">
              <strong className={`${highlightColor}`}>Total Problems Solved:</strong>
              {userInfo.totalProblemsSolved}
            </p>
            <p><strong className={`${highlightColor}`}>Highest Rating:</strong> {userInfo.highestRating}</p>
          </div>
        </div>
        <div
          className={`rounded-lg p-6 mb-4 border ${borderColor} shadow-md flex flex-col ${backgroundColor}`}
        >
          <h3 className={`font-semibold text-lg mb-4 ${highlightColor}`}>Ranking</h3>
          <ol className="list-decimal pl-4 flex-grow">
            {rankings.map((rank) => (
              <li key={rank.user} className="flex justify-between my-2">
                <span>{rank.user}</span>
                <span className={`font-semibold ${highlightColor}`}>{rank.rating}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <div className={`p-6 m-10 rounded-lg border ${borderColor} shadow-md mt-4 ${textColor} ${backgroundColor}`}>
        <Calendar />
      </div>
    </>
  );
}

export default Profile;
