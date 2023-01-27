/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconChevronDown, IconMail } from '@tabler/icons';
import PropTypes from 'prop-types';
import Logo from '../Logo';
import UserProfile from '../UserProfile';
import ButtonFullWidth from '../ButtonFullWidth';

function Navbar({ authUser, onLogout }) {
  const [openMenu, setOpenMenu] = useState(false);

  const onOpenMenuHandler = (event) => {
    event.stopPropagation();
    setOpenMenu((prevState) => !prevState);
  };

  return (
    <div className="navbar-fixed w-full h-[62px] flex items-center bg-white shadow-navbar">
      <div className="container mx-auto">
        <div className="flex justify-between items-center px-4">
          <div>
            <Logo />
          </div>
          <div className="relative">
            {authUser ? (
              <>
                <div
                  role="button"
                  tabIndex={-1}
                  className="flex items-center space-x-2 cursor-pointer"
                  onClick={onOpenMenuHandler}
                >
                  <UserProfile
                    alt="user logged profile"
                    avatar={authUser.avatar}
                  />
                  <IconChevronDown size={16} />
                </div>
                <div
                  className={`${
                    openMenu ? 'block' : 'hidden'
                  } absolute top-full right-0 w-60 pt-4`}
                >
                  <div className="rounded bg-white border border-slate-100 shadow-md">
                    <div className="p-4 pb-3 border-b border-b-slate-100">
                      <div className="capitalize">
                        {authUser?.name || 'Guest'}
                      </div>
                      <div className="text-xs text-slate-400">
                        {authUser?.email || 'you@example.com'}
                      </div>
                    </div>
                    <div className="p-4 text-paragraph text-sm">
                      <a
                        href={`mailto:${authUser?.email}`}
                        target="_blank"
                        className="flex items-center mb-6 space-x-4"
                        rel="noreferrer"
                      >
                        <IconMail />
                        <span>Send Mail</span>
                      </a>
                      <ButtonFullWidth
                        bgcolorClass="bg-transparent"
                        colorClass="text-paragraph"
                        className="font-medium border border-slate-200 hover:bg-primary hover:text-white"
                        handleClick={onLogout}
                      >
                        Logout
                      </ButtonFullWidth>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="space-x-2">
                <Link
                  to="/login"
                  className="inline-block px-6 py-1 bg-primary border border-primary text-white rounded-full"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="inline-block px-6 py-1 border border-primary text-primary rounded-full"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const authUserShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string,
};

Navbar.propTypes = {
  authUser: PropTypes.shape(authUserShape),
  onLogout: PropTypes.func,
};

export default Navbar;
