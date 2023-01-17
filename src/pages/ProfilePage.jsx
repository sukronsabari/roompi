import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncUnsetAuthUser } from '../states/authUser/action';
import Button from '../components/Button';
import PageLayout from '../components/PageLayout';
import UserProfile from '../components/UserProfile';

function ProfilePage() {
  const dispatch = useDispatch();
  const { authUser } = useSelector((states) => states);

  const onLogoutHandler = () => {
    dispatch(asyncUnsetAuthUser());
  };

  return (
    <PageLayout>
      <div className="px-4 mt-6">
        <div className="h-40 flex items-end justify-end rounded-sm rounded-t-2xl bg-sky-200">
          <div className="text-sky-900 text-right mr-6 mb-6">
            <h2 className="text-xl">{`Hello ${authUser?.name || 'Guest'}`}</h2>
            <p>Have a nice day</p>
          </div>
        </div>
        <div className="pl-6">
          <div className="flex space-x-3 -mt-10">
            <div className="flex h-fit items-center justify-center overflow-hidden rounded-full border-2 p-[1px] border-white shadow">
              <UserProfile avatar={authUser?.avatar} className="w-20 h-20" />
            </div>
            <div className="self-end mt-6">
              <h3 className="font-medium text-base">
                {authUser?.name || 'Guest'}
              </h3>
              <p className="text-sm text-paragraph">
                {`${authUser?.email || 'guest@example.com'}`}
              </p>
            </div>
          </div>
          {authUser && (
            <div className="absolute bottom-36 right-7">
              <Button handleClick={onLogoutHandler}>Logout</Button>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}

export default ProfilePage;
