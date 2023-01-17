import React from 'react';
import PropTypes from 'prop-types';
import ctl from '@netlify/classnames-template-literals';
import { useNavigate } from 'react-router-dom';
import UserProfile from '../UserProfile';
import ButtonFullWidth from '../ButtonFullWidth';

function AuthUserRank({
  name = 'guest',
  avatar,
  rankPosition = '-',
  score = '-',
}) {
  const navigate = useNavigate();
  const [firstname, lastname] = name.split(' ');
  const styles = ctl(`
    p-6 rounded-md
    bg-primary text-white
    max-w-3xl lg:w-96 
    lg:p-8 lg:bg-white 
    lg:text-dark lg:border
    lg:border-slate-300
  `);

  return (
    <div className={styles}>
      <h2 className="font-bold mb-6 text-lg lg:text-center">Your Rank</h2>
      <div className="flex justify-between lg:hidden">
        <div className="flex items-center space-x-4">
          <p className="text-xl font-bold">{rankPosition}</p>
          <div className="flex items-center space-x-4">
            <UserProfile size="45" avatar={avatar} />
            <div>
              <p className="font-medium text-xl capitalize">{firstname}</p>
              {lastname && <p className="text-sm">{lastname}</p>}
            </div>
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm">Points</p>
          <p className="font-bold text-xl">{score}</p>
        </div>
      </div>

      <div className="hidden lg:block">
        <div className="flex flex-col items-center mb-8">
          <UserProfile avatar={avatar} className="w-20 h-20" />
          <div className="text-center mt-2">
            <p className="text-lg capitalize">{firstname}</p>
            {lastname && <p className="text-sm">{lastname}</p>}
          </div>
        </div>
        <div className="flex justify-between">
          <div className="text-center">
            <p className="text-sm">Position</p>
            <p className="font-bold text-2xl">{rankPosition}</p>
          </div>
          <div className="text-center">
            <p className="text-sm">Score</p>
            <p className="font-bold text-2xl">{score}</p>
          </div>
        </div>
        <div className="mt-8">
          <ButtonFullWidth
            type="button"
            className="hover:bg-sky-700 focus:ring focus:ring-sky-100"
            handleClick={() => navigate('/')}
          >
            Boost Rank
          </ButtonFullWidth>
        </div>
      </div>
    </div>
  );
}

AuthUserRank.propTypes = {
  name: PropTypes.string,
  avatar: PropTypes.string,
  rankPosition: PropTypes.string,
  score: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default AuthUserRank;
