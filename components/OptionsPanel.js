import React from 'react';

const OptionsPanel = ({ options, onOptionChange }) => {
  return (
    <div className="w-full p-4 bg-gray-100">
      <h2 className="text-2xl mb-4">Customize Block</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="width" className="block">Width:</label>
          <input
            type="range"
            id="width"
            min="0.1"
            max="5"
            step="0.1"
            value={options.width}
            onChange={(e) => onOptionChange('width', parseFloat(e.target.value))}
          />
          <span>{options.width}</span>
        </div>
        <div>
          <label htmlFor="height" className="block">Height:</label>
          <input
            type="range"
            id="height"
            min="0.1"
            max="5"
            step="0.1"
            value={options.height}
            onChange={(e) => onOptionChange('height', parseFloat(e.target.value))}
          />
          <span>{options.height}</span>
        </div>
        <div>
          <label htmlFor="depth" className="block">Depth:</label>
          <input
            type="range"
            id="depth"
            min="0.1"
            max="5"
            step="0.1"
            value={options.depth}
            onChange={(e) => onOptionChange('depth', parseFloat(e.target.value))}
          />
          <span>{options.depth}</span>
        </div>
        <div>
          <label htmlFor="color" className="block">Color:</label>
          <input
            type="color"
            id="color"
            value={options.color}
            onChange={(e) => onOptionChange('color', e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="shape" className="block">Shape:</label>
          <select
            id="shape"
            value={options.shape}
            onChange={(e) => onOptionChange('shape', e.target.value)}
          >
            <option value="cube">Cube</option>
            <option value="sphere">Sphere</option>
            <option value="cylinder">Cylinder</option>
            <option value="custom">Custom 3D Model</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default OptionsPanel;