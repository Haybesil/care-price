import React from 'react';
import APP_METADATA from '../../metadata';

const Copyright = () => {
  return (
    <div className="text-[#76828D] text-base font-normal mt-8 px-6 sm:px-8">
      <p>@{APP_METADATA.name} copyright</p>
    </div>
  );
};

export default Copyright;
