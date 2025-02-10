import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { invoke } from "@tauri-apps/api/core";
import { Variable } from "../../../interface";


export const SchemaViewer: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [variables, setVariables] = useState<Variable[]>([]);
  const [delimiter, setDelimiter] = useState<string>(',');
  const [packetDelimiter, setPacketDelimiter] = useState<string>(';');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSchema = async () => {
      try {
        const content = await invoke<string>('read_schema', { fileName: name });
        const parsedSchema = JSON.parse(content);
        setVariables(parsedSchema.variables || []);
        setDelimiter(parsedSchema.delimiter || ',');
        setPacketDelimiter(parsedSchema.packetDelimiter || ';');
      } catch (err) {
        setError('Failed to load or parse schema');
        console.error(err);
      }
    };
    fetchSchema();
  }, [name]);

  const handleEditClick = () => {
    navigate(`/scheme/edit/${name}`, {
      state: {
        schemaFileName: name?.split('.')[0],
        schemaContent: JSON.stringify({ variables, delimiter, packetDelimiter })
      },
    });
  };

  const handleDeleteClick = async () => {
    if (!window.confirm('Are you sure you want to delete this schema?')) return;
    try {
      await invoke('delete_schema', { fileName: name });
      alert('Schema deleted successfully');
      navigate('/scheme');
    } catch (err) {
      console.error(err);
      alert('Failed to delete schema');
    }
  };

  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="schema-viewer">
      <h2>Schema: {name}</h2>
      <div className="schema-viewer-container">
        <div className="variable-container">
          {variables.map((variable) => (
            <div key={variable.id} className="variable">
              <div className="variable-name">{variable.name}</div>
              <div className="variable-type">{variable.type}</div>
            </div>
          ))}
        </div>
        <div className="schema-delimiters">
          <div className="variable">
            <div>Field Delimiter  {delimiter}</div>
          </div>
          <div className="variable">
            <div>Packet Delimiter {packetDelimiter}</div>
          </div>
        </div>
      </div>
      <fieldset className="schema-actions">
        <button onClick={handleEditClick} className="edit-button">Edit</button>
        <button onClick={handleDeleteClick} className="delete-button">Delete</button>
      </fieldset>
    </div>
  );
};
