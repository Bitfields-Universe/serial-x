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
    <div className='schema-list-view'>
      <h2>Schema List</h2>
      <hr />
      <Link to='/scheme/edit/new'>
        <button>New Schema</button>
      </Link>
      <ul className='schema-list'>
        {schemas.map((scheme) => (
          <li key={scheme} className='schema-list-item'>
            <div className='scheme-filename'>{scheme}</div>
            <Link to={`/scheme/view/${scheme}`} className='scheme-view-link'>View</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
