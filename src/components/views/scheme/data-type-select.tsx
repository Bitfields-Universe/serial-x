import React from 'react';
import { DataTypeSelectProps } from '../../../interface';

const scalarTypes = [
  'double', 'float', 'int32', 'int64', 'uint32', 'uint64',
  'sint32', 'sint64', 'fixed32', 'fixed64', 'sfixed32', 'sfixed64',
  'bool', 'string', 'bytes'
];

const DataTypeSelect: React.FC<DataTypeSelectProps> = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ padding: '5px', border: '1px solid #ccc', borderRadius: '4px' }}
    >
      {scalarTypes.map((type) => (
        <option key={type} value={type}>
          {type}
        </option>
      ))}
    </select>
  );
};

export default DataTypeSelect;
