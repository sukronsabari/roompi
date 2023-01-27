import React from 'react';
// import ctl from '@netlify/classnames-template-literals';
import { useDispatch } from 'react-redux';
import RegisterInput from '../components/RegisterInput';
import { asyncRegisterUser } from '../states/users/action';
import phoneImage from '../assets/images/phone.png';

function RegisterPage() {
  const dispatch = useDispatch();
  const registerUserHandler = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ name, email, password }));
  };

  return (
    <section className="mx-auto pt-[56px] max-w-full lg:bg-slate-100">
      <div className="px-4 lg:flex lg:h-screenCustom lg:px-0">
        <div className="w-full h-full hidden lg:flex lg:items-center lg:justify-center">
          <div className="max-w-sm mr-20">
            <img src={phoneImage} aria-hidden alt="phone image" />
          </div>
        </div>
        <div className="w-full bg-white pt-10 lg:pt-14">
          <header className="mb-8">
            <h1 className="text-xl text-center tracking-wide md:text-2xl">
              REGISTER
            </h1>
          </header>
          <RegisterInput registerUser={registerUserHandler} />
        </div>
      </div>
    </section>
  );
}

export default RegisterPage;
