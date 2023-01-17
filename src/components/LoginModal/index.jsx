import React from 'react';
import { Link } from 'react-router-dom';
import { IconX } from '@tabler/icons';
import PropTypes from 'prop-types';

function LoginModal({ showLoginModal, closeLoginModal }) {
  return (
    <div
      className={`${
        showLoginModal ? 'flex' : 'hidden'
      } fixed top-0 left-0 z-[999] w-full h-screen items-center justify-center bg-slate-50/40 select-none pointer-events-none`}
    >
      <div className="max-w-xs relative p-8 bg-white rounded-lg shadow-lg select-auto pointer-events-auto md:max-w-sm">
        <IconX
          onClick={closeLoginModal}
          className="absolute top-3 right-3 cursor-pointer"
        />
        <div className="w-full mt-6">
          <h2 className="font-bold text-lg md:text-xl mb-4">
            Log in to continue your action
          </h2>
          <p className="text-paragraph mb-6">
            When you are logged in, you can like, dislike, and create new posts
          </p>
          <Link
            to="/login"
            className="block w-full rounded-full py-3 mb-4 bg-primary font-medium text-white text-center"
            onClick={closeLoginModal}
          >
            Login
          </Link>
          <Link
            to="/register"
            className="block w-full rounded-full py-3 border border-primary font-medium text-primary text-center"
            onClick={closeLoginModal}
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

LoginModal.propTypes = {
  showLoginModal: PropTypes.bool,
  closeLoginModal: PropTypes.func,
};

export default LoginModal;
