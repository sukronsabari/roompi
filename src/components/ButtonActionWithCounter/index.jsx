import React from 'react';
import PropTypes from 'prop-types';

function ButtonIconWithCounter({
  children,
  count,
  title = '',
  ariaLabel = '',
  handleClick,
  color = 'text-slate-500',
  isActive,
}) {
  return (
    <button
      type="button"
      className="flex items-center space-x-1"
      title={title}
      aria-label={ariaLabel}
      onClick={handleClick}
    >
      <span className={`${color} ${isActive && 'font-bold'}`}>{children}</span>
      <span
        className={`${color} text-xs font-medium leading-none ${
          isActive && 'font-bold'
        }`}
      >
        {count}
      </span>
    </button>
  );
}

ButtonIconWithCounter.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
    .isRequired,
  count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  title: PropTypes.string,
  ariaLabel: PropTypes.string,
  handleClick: PropTypes.func,
  color: PropTypes.string,
  isActive: PropTypes.bool,
};

export default ButtonIconWithCounter;
