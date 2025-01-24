import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { invoke } from '@tauri-apps/api/core';

export const SchemaViewer: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [schemaContent, setSchemaContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSchema = async () => {
      try {
        const content = await invoke<string>('read_schema', { file_name: name });
        setSchemaContent(content);
      } catch (err) {
        setError('Failed to load schema');
        console.error(err);
      }
    };
    fetchSchema();
  }, [name]);

  const handleEditClick = () => {
    navigate(`/schema-builder/${name}`, { state: { schemaContent } });
  };

  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Schema: {name}</h2>
      <pre>{schemaContent}</pre>
      <button onClick={handleEditClick}>Edit</button>
    </div>
  );
};
