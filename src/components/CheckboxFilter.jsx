import React from 'react';
import { MODELS } from '../constants';

const CheckboxFilter = ({ visibleModels, setVisibleModels, modelsToShow = MODELS }) => (
  <div className="mb-4 p-3 border rounded-lg bg-gray-50">
    <h3 className="font-semibold text-gray-700 mb-2 text-sm">Hiển thị Models</h3>
    <div className="flex flex-wrap gap-x-4 gap-y-2">
      {modelsToShow.map(model => (
        <label key={model} className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={!!visibleModels[model]}
            onChange={() => setVisibleModels(prev => ({ ...prev, [model]: !prev[model] }))}
            className="form-checkbox h-4 w-4 rounded text-blue-600"
          />
          <span className="ml-2 text-sm text-gray-700">{model}</span>
        </label>
      ))}
    </div>
  </div>
);

export default CheckboxFilter;
