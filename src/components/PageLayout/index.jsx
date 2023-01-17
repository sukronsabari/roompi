import React from 'react';
import PropTypes from 'prop-types';
import ctl from '@netlify/classnames-template-literals';
import Navigation from '../Navigation';

function PageLayout({ children }) {
  const asideStyles = ctl(`
    fixed
    bottom-0
    left-0
    w-full
    bg-white
    border-t
    border-t-slate-300
    md:border-t-0
    md:w-48
    md:h-screenCustom
    lg:h-screenCustom md:border-r 
    md:border-r-slate-200  md:block lg:w-60
  `);

  return (
    <section className="max-w-full">
      <aside className={asideStyles}>
        <div className="py-3 px-6 mx-auto md:p-0 md:pt-8 md:w-fit">
          <p className="hidden text-slate-400 text-xs mb-3 md:block">MENU</p>
          <Navigation />
        </div>
      </aside>
      <div className="md:ml-48 lg:ml-60 pt-[62px] pb-28">{children}</div>
    </section>
  );
}

PageLayout.propTypes = {
  children: PropTypes.element,
};

export default PageLayout;
