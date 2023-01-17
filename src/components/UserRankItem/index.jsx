import React from 'react';
import PropTypes from 'prop-types';
import UserProfile from '../UserProfile';

// eslint-disable-next-line object-curly-newline
function UserRankItem({ name, avatar, rankPosition, score }) {
  const [firstname, lastname] = name.split(' ');

  return (
    <div className="flex items-center justify-between py-4 px-6 rounded-md border border-slate-300">
      <div className="flex items-center space-x-4">
        <p className="text-xl font-medium text-slate-400">{rankPosition}</p>
        <div className="flex items-center space-x-4">
          <div>
            <UserProfile avatar={avatar} />
          </div>
          <div>
            <p className="text-xl font-medium capitalize">{firstname}</p>
            {lastname && (
              <p className="text-sm text-paragraph capitalize">{lastname}</p>
            )}
          </div>
        </div>
      </div>
      <div>
        <div className="text-center">
          <p className="text-lg font-bold">{score}</p>
          <p className="text-sm">Points</p>
        </div>
      </div>
    </div>
  );
}

UserRankItem.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  rankPosition: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

export default UserRankItem;
