import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { invoke } from '@tauri-apps/api/core';

interface Variable {
  name: string;
  type: string;
}

const PROTOBUF_TYPES = [
  "double", "float", "int32", "int64", "uint32", "uint64",
  "sint32", "sint64", "fixed32", "fixed64", "sfixed32", "sfixed64",
  "bool", "string", "bytes"
];

export const SchemaBuilder: React.FC = () => {
  const location = useLocation();
  const [variables, setVariables] = useState<Variable[]>([]);
  const [fileName, setFileName] = useState('');
  const [delimiter, setDelimiter] = useState(',');
  const [packetDelimiter, setPacketDelimiter] = useState(';');

  useEffect(() => {
    if (location.state?.schemaFileName) {
      setFileName(location.state.schemaFileName); // Set file name
    }
    if (location.state?.schemaContent) {
      try {
        const parsedSchema = JSON.parse(location.state.schemaContent);
        setVariables(parsedSchema.variables || []);
        setDelimiter(parsedSchema.delimiter || ',');
        setPacketDelimiter(parsedSchema.packetDelimiter || ';');
      } catch (error) {
        console.error('Error parsing schema:', error);
      }
    }
  }, [location.state]);

  const addVariable = () => {
    setVariables([...variables, { name: '', type: 'double' }]);
  };

  const updateVariable = (index: number, key: keyof Variable, value: string) => {
    setVariables(
      variables.map((v, i) => (i === index ? { ...v, [key]: value } : v))
    );
  };

  const handleSave = async () => {
    if (!fileName) {
      alert('Please enter a file name');
      return;
    }
    try {
      await invoke('save_schema', {
        fileName,
        schemaData: JSON.stringify({ variables, delimiter, packetDelimiter }, null, 2),
      });
      alert('Schema saved successfully!');
    } catch (error) {
      console.error('Error saving schema:', error);
    }
  };

  return (
    <div className='schema-builder'>
      <h2>Schema Builder</h2>
      <hr />
      <div className="box">
        <label>Schema File Name:</label>
        <input
          type='text'
          placeholder='Enter schema file name'
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
        />
      </div>
      <div className="box">
        <label>Field Delimiter: </label>
        <input
          type='text'
          placeholder='Enter field delimiter'
          value={delimiter}
          onChange={(e) => setDelimiter(e.target.value)}
        />
      </div>
      <div className="box">
        <label>Packet Delimiter:</label>
        <input
          type='text'
          placeholder='Enter packet delimiter'
          value={packetDelimiter}
          onChange={(e) => setPacketDelimiter(e.target.value)}
        />
      </div>
      <div className="box flex-column">
        <h3>Variables</h3>
        {variables.map((variable, index) => (
          <div key={index}>
            <input
              type='text'
              placeholder='Variable Name'
              value={variable.name}
              onChange={(e) => updateVariable(index, 'name', e.target.value)}
            />
            <select
              value={variable.type}
              onChange={(e) => updateVariable(index, 'type', e.target.value)}
            >
              {PROTOBUF_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <div className="box">
        <button onClick={addVariable}>+ Add Variable</button>
        <button onClick={handleSave}>Save Schema</button>
      </div>
    </div>
  );
};
