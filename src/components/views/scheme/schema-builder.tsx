import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import VariableNameInput from './variable-name-input';
import DataTypeSelect from './data-type-select';
import { invoke } from "@tauri-apps/api/core";

interface Variable {
  id: number;
  name: string;
  type: string;
}

export const SchemaBuilder: React.FC = () => {
  const location = useLocation();
  const [variables, setVariables] = useState<Variable[]>([]);
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    if (location.state?.schemaContent) {
      try {
        const parsedSchema = JSON.parse(location.state.schemaContent);
        setVariables(parsedSchema);
      } catch (error) {
        console.error('Error parsing schema:', error);
      }
    }
  }, [location.state]);

  const addVariable = () => {
    setVariables([...variables, { id: Date.now(), name: '', type: 'double' }]);
  };

  const updateVariable = (id: number, key: keyof Variable, value: string) => {
    setVariables(
      variables.map((v) =>
        v.id === id ? { ...v, [key]: value } : v
      )
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
        schemaData: JSON.stringify(variables, null, 2),
      });
      alert('Schema saved successfully!');
    } catch (error) {
      console.error('Error saving schema:', error);
    }
  };

  return (
    <div className='schema-builder'>
      <div className='half'>
        <h2>Schema Builder</h2>
        <hr />
        <input
          type="text"
          placeholder="Enter schema file name"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
        />
        <hr />
        {variables.map((variable) => (
          <div key={variable.id} style={{ display: 'flex', gap: '10px' }}>
            <VariableNameInput
              value={variable.name}
              onChange={(value: any) => updateVariable(variable.id, 'name', value)}
            />
            <DataTypeSelect
              value={variable.type}
              onChange={(value: any) => updateVariable(variable.id, 'type', value)}
            />
          </div>
        ))}
        <hr />
        <div className='button-group'>
          <button onClick={addVariable}>+ Add Variable</button>
          <button onClick={handleSave}>Save Schema</button>
        </div>
      </div>
      <div className='half'>
        <h3>Generated Schema:</h3>
        <pre>{JSON.stringify(variables, null, 2)}</pre>
      </div>
    </div>
  );
};
