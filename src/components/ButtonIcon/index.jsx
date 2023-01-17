/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';

function ButtonIcon({
  title = '',
  className,
  classNameInner,
  handleClick,
  children,
  isDisable,
}) {
  const styleFlex = 'flex justify-center items-center';

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`w-[44px] h-[44px] ${styleFlex} ${className}`}
      title={title}
      disabled={isDisable}
    >
      <div
        className={`w-[35px] h-[35px] overflow-hidden ${styleFlex} ${classNameInner}`}
      >
        {children}
      </div>
    </button>
  );
}

ButtonIcon.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  classNameInner: PropTypes.string,
  handleClick: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  isDisable: PropTypes.bool,
};

export default ButtonIcon;
