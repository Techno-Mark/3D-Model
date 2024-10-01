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
    <div className="flex">
      <OptionsPanel options={blockOptions} onOptionChange={handleOptionChange} />
      <Preview3D options={blockOptions} />
    </div>
  );
};

export default BlockCustomizer;