import React from 'react';
import PropTypes from 'prop-types';
import UserRankItem from '../UserRankItem';

function UserRankList({ users }) {
  return (
    <div className="space-y-4">
      {users.map((userData, index) => (
        <UserRankItem
          key={userData.user.id}
          {...userData.user}
          rankPosition={index + 1}
          score={userData.score}
        />
      ))}
    </div>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string,
  avatar: PropTypes.string.isRequired,
};

const leaderboardShape = {
  user: PropTypes.shape(userShape),
  score: PropTypes.number,
};

UserRankList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape(leaderboardShape)),
};

export default UserRankList;
