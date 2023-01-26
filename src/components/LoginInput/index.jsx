import React, { useId } from 'react';
import PropTypes from 'prop-types';
import ctl from '@netlify/classnames-template-literals';
import { Link, useNavigate } from 'react-router-dom';
import ButtonFullWidth from '../ButtonFullWidth';
import useInput from '../../hooks/useInput';

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
  before:-bottom-3
  before:absolute
`);

function LoginInput({ login }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const navigate = useNavigate();
  const id = useId();

  const onLogin = () => {
    login({ email, password });
    navigate('/');
  };

  return (
    <form
      className="max-w-xl mx-auto px-4 lg:max-w-md"
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="mb-4">
        <label htmlFor={`${id}-email`} className="block">
          <span className={spanLabelStyle}>Email</span>
          <input
            type="email"
            placeholder="you@example.com"
            id={`${id}-email`}
            value={email} // state dikirim lewat pros
            onChange={onEmailChange}
            className={`${inputStyle} peer/email`}
          />
          <p className="mt-2 invisible text-rose-600 text-xs peer-invalid/email:visible">
            Please provide a valid email address.
          </p>
        </label>
      </div>
      <div className="mb-12">
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
        <ButtonFullWidth type="submit" handleClick={onLogin}>
          Login
        </ButtonFullWidth>
      </div>
      <div className="mt-4">
        <p>
          <span className="mr-1">Don&apos;t have account?</span>
          <Link to="/register" className="text-primary underline">
            Register here
          </Link>
        </p>
      </div>
    </form>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
