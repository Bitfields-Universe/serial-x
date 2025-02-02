// src/components/SerialPortListItem.tsx
import React from 'react';
import { SerialPort } from '../../../../interface';
import { formatBytes } from '../../../../util';


export const SerialPortListItem: React.FC<{ port: SerialPort }> = ({ port }) => {
  return (
    <div className='port-list-item'>
      <div className='port-name'><strong>{port.name}</strong></div>
      <div className='port-status'>Status: <span style={{ color: port.status === true ? 'green' : 'red' }}>{port.status === true ? 'OPEN' : 'CLOSED'}</span></div>
      <div className='port-upload'>Upload: {formatBytes(Number(port.upload))}</div>
      <div className='port-download'>Download: {formatBytes(Number(port.download))}</div>
    </div>
  );
};
