import React from 'react';
import { VariableNameInputProps } from '../../../interface';


const VariableNameInput: React.FC<VariableNameInputProps> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Enter variable name"
      style={{ padding: '5px', border: '1px solid #ccc', borderRadius: '4px' }}
    />
  );
};

export default VariableNameInput;
