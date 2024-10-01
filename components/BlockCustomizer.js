import React, { useState } from 'react';
import OptionsPanel from './OptionsPanel';
import Preview3D from './Preview3D';

const BlockCustomizer = () => {
  const [blockOptions, setBlockOptions] = useState({
    width: 1,
    height: 1,
    depth: 1,
    color: '#ff0000',
    shape: 'cube',
  });

  const handleOptionChange = (option, value) => {
    setBlockOptions(prevOptions => ({
      ...prevOptions,
      [option]: value
    }));
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/3">
        <OptionsPanel options={blockOptions} onOptionChange={handleOptionChange} />
      </div>
      <div className="w-2/3">
        <Preview3D options={blockOptions} />
      </div>
    </div>
  );
};

export default BlockCustomizer;