import React from 'react';
import PropTypes from 'prop-types';

function Button({
  type = 'button',
  bgcolor = 'bg-primary',
  className,
  children,
  isDisable = false,
  handleClick,
}) {
  return (
    <button
      type={type}
      className={`py-2 px-4 font-medium rounded-sm text-white ${bgcolor} ${className}`}
      onClick={handleClick}
      disabled={isDisable}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  bgcolor: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.string.isRequired,
  isDisable: PropTypes.bool,
  handleClick: PropTypes.func,
};

export default Button;
