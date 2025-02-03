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
        schemaFileName: name?.split('.')[0], // Pass file name
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

  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Schema: {name}</h2>
      <table border={1}>
        <thead>
          <tr>
            <th>Variable Name</th>
            <th>Data Type</th>
          </tr>
        </thead>
        <tbody>
          {variables.map((variable) => (
            <tr key={variable.id}>
              <td>{variable.name}</td>
              <td>{variable.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Field Delimiter: <strong>{delimiter}</strong></p>
      <p>Packet Delimiter: <strong>{packetDelimiter}</strong></p>
      <button onClick={handleEditClick}>Edit</button>
      <button onClick={handleDeleteClick}>Delete</button>
    </div>
  );
};
