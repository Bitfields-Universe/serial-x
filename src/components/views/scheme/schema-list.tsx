import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { invoke } from '@tauri-apps/api/core';

export const SchemaList = () => {
  const [schemas, setSchemas] = useState(Array<string>);

  useEffect(() => {
    const fetchSchemas = async () => {
      try {
        const result: Array<string> = await invoke('list_schemas');
        setSchemas(result);  // Ensure result is an array of schema objects
      } catch (error) {
        console.error('Failed to fetch schemas:', error);
      }
    };

    fetchSchemas();
  }, []);

  return (
    <div>
      <h2>Schema List</h2>
      <Link to='/scheme/edit/new'>New Schema</Link>
      <ul>
        {schemas.map((scheme) => (
          <li key={scheme}>
            {scheme}
            <Link to={`/scheme/view/${scheme}`} style={{ marginLeft: '10px' }}>View</Link>
            <Link to={`/scheme/edit/${scheme}`} style={{ marginLeft: '10px' }}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
