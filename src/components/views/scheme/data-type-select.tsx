import React from 'react';

interface DataTypeSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const DATA_TYPES = ['int', 'float', 'double', 'string', 'boolean'];

const DataTypeSelect: React.FC<DataTypeSelectProps> = ({ value, onChange }) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {DATA_TYPES.map((type) => (
        <option key={type} value={type}>
          {type}
        </option>
      ))}
    </select>
  );
};

export default DataTypeSelect;
