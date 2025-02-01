// src/components/SerialPortListItem.tsx
import React from 'react';
import { SerialPort } from '../../../../interface';


export const SerialPortListItem: React.FC<{ port: SerialPort }> = ({ port }) => {
  return (
    <div className='port-list-item'>
      <div className='port-name'><strong>{port.name}</strong></div>
      <div className='port-status'>Status: <span style={{ color: port.status === 'open' ? 'green' : 'red' }}>{port.status.toUpperCase()}</span></div>
      <div className='port-upload'>Upload: {port.bytes_sent}</div>
      <div className='port-download'>Download: {port.bytes_received}</div>
    </div>
  );
};
