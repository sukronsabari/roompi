import React from 'react';
import LoadingBar from 'react-redux-loading-bar';

function Loading() {
  return (
    <div className="fixed top-0 left-0 z-[999999] h-[2px] w-full">
      <LoadingBar updateTime={100} style={{ backgroundColor: '#0284c7' }} />
    </div>
  );
}

export default Loading;
