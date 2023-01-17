import React, { useId } from 'react';
import ctl from '@netlify/classnames-template-literals';
import PropTypes from 'prop-types';
import { useNavigate, Link } from 'react-router-dom';
import useInput from '../../hooks/useInput';
import ButtonFullWidth from '../ButtonFullWidth';

const spanLabelStyle = ctl(`
  block
  text-slate-700
  font-medium
  after:content-['*']
  after:ml-0.5
  after:text-rose-600
`);

const inputStyle = ctl(`
  block
  w-full
  mt-2
  px-3
  py-2
  bg-white
  text-slate-700
  shadow-sm
  rounded
  border
  border-slate-300
  placeholder-slate-400
  focus:outline-none
  focus:border-sky-500
  focus:ring-1
  focus:ring-sky-500
`);

const passwordHint = ctl(`
  bg-neutral-600
  text-white 
  absolute
  hidden
  -top-4
  right-4
  w-24
  text-center
  leading-tight
  font-medium
  py-2 
  px-3 
  text-[10px] 
  capitalize 
  rounded-md
  before:content['']
  before:w-[10px]
  before:h-[10px]
  before:border-8
  before:border-transparent
  before:border-t-neutral-600
  before:-bottom-4
  before:absolute
`);

function RegisterInput({ registerUser }) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const id = useId();
  const navigate = useNavigate();

  const onRegisterUser = (event) => {
    event.preventDefault();
    registerUser({ name, email, password });
    navigate('/login');
  };

  return (
    <form
      className="max-w-xl block mx-auto lg:max-w-md"
      onSubmit={onRegisterUser}
    >
      <div className="mb-6">
        <label htmlFor={`${id}-name`} className="block">
          <span className={spanLabelStyle}>Name</span>
          <input
            type="text"
            placeholder="ex: John Doe"
            id={`${id}-name`}
            value={name}
            onChange={onNameChange}
            className={inputStyle}
          />
        </label>
      </div>
      <div className="mb-2">
        <label htmlFor={`${id}-email`} className="block relative">
          <span className={spanLabelStyle}>Email</span>
          <input
            type="email"
            placeholder="you@example.com"
            id={`${id}-email`}
            value={email}
            onChange={onEmailChange}
            className={`${inputStyle} peer/email`}
          />
          <p className="mt-2 invisible text-rose-600 text-xs peer-invalid/email:visible">
            Please provide a valid email address.
          </p>
        </label>
      </div>
      <div className="mb-8">
        <label htmlFor={`${id}-password`} className="block relative">
          <span className={spanLabelStyle}>Password</span>
          <input
            type="password"
            placeholder="******"
            id={`${id}-password`}
            value={password}
            onChange={onPasswordChange}
            className={`${inputStyle} peer/password`}
          />
          <div
            className={`${passwordHint} ${
              password.length < 6 ? 'peer-focus/password:block' : ''
            }`}
          >
            enter at least 6 characters
          </div>
        </label>
      </div>
      <div>
        <ButtonFullWidth type="submit">Register</ButtonFullWidth>
      </div>
      <div className="mt-4">
        <p>
          <span className="mr-1">Already have an account?</span>
          <Link to="/login" className="text-primary underline">
            Login here
          </Link>
        </p>
      </div>
    </form>
  );
}

RegisterInput.propTypes = {
  registerUser: PropTypes.func.isRequired,
};

export default RegisterInput;
