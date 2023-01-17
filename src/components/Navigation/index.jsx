import React from 'react';
import { NavLink } from 'react-router-dom';
import { IconHash, IconBadge, IconUser } from '@tabler/icons';

function Navigation() {
  return (
    <nav className="max-w-md mx-auto md:m-0">
      <ul className="flex justify-between md:items-start md:flex-col md:space-y-6 list-none">
        <li>
          <NavLink to="/" className="block font-medium">
            {({ isActive }) => (
              <div className="flex flex-col items-center justify-center md:flex-row md:space-x-2">
                <IconHash
                  className={`${
                    isActive ? 'text-primary' : 'text-dark'
                  } uppercase md:capitalize text-[10px] md:text-base`}
                  width={24}
                />
                <span
                  className={`${
                    isActive ? 'text-primary' : 'text-dark'
                  } uppercase md:capitalize text-[10px] md:text-base`}
                >
                  Explore
                </span>
              </div>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink to="/topusers" className="block font-medium">
            {({ isActive }) => (
              <div className="flex flex-col items-center justify-center md:flex-row md:space-x-2">
                <IconBadge
                  className={`${
                    isActive ? 'text-primary' : 'text-dark'
                  } uppercase md:capitalize text-[10px] md:text-base`}
                  width={24}
                />
                <span
                  className={`${
                    isActive ? 'text-primary' : 'text-dark'
                  } uppercase md:capitalize text-[10px] md:text-base`}
                >
                  Top Users
                </span>
              </div>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile" className="block font-medium">
            {({ isActive }) => (
              <div className="flex flex-col items-center justify-center md:flex-row md:space-x-2">
                <IconUser
                  className={`${
                    isActive ? 'text-primary' : 'text-dark'
                  } uppercase md:capitalize text-[10px] md:text-base`}
                  width={24}
                />
                <span
                  className={`${
                    isActive ? 'text-primary' : 'text-dark'
                  } uppercase md:capitalize text-[10px] md:text-base`}
                >
                  Profile
                </span>
              </div>
            )}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
