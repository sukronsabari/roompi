import React from 'react';
import PropTypes from 'prop-types';
import defaultAvatar from '../../assets/images/user.png';

function UserProfile({ avatar, className = 'w-[40px] h-[40px]' }) {
  return (
    <div className={`overflow-hidden min-h-0 rounded-full ${className}`}>
      <img
        src={avatar || defaultAvatar}
        alt="user profile"
        className="min-w-0 w-full object-cover"
      />
    </div>
  );
}

UserProfile.propTypes = {
  avatar: PropTypes.string,
  className: PropTypes.string,
};

export default UserProfile;
