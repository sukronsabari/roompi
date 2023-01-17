import React from 'react';
import PropTypes from 'prop-types';

function ButtonFullWidth({
  type = 'button',
  bgcolorClass = 'bg-primary',
  colorClass = 'text-white',
  children,
  className,
  handleClick,
  isDisable = false,
}) {
  return (
    <button
      type={type}
      className={`h-[44px] w-full block text-center rounded transition-all  ${bgcolorClass} ${colorClass} ${className}`}
      onClick={handleClick}
      disabled={isDisable}
    >
      {children}
    </button>
  );
}

ButtonFullWidth.propTypes = {
  type: PropTypes.string,
  bgcolorClass: PropTypes.string,
  colorClass: PropTypes.string,
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  handleClick: PropTypes.func,
  isDisable: PropTypes.bool,
};

export default ButtonFullWidth;
