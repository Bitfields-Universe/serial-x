// src/components/SerialPortListItem.tsx
import React from 'react';

export interface SerialPort {
  name: string;
  status: 'open' | 'closed';
  upload: string;
  download: string;
  deviceName: string;
}

export const SerialPortListItem: React.FC<{ port: SerialPort }> = ({ port }) => {
  return (
    <div className='port-list-item'>
      <div><strong>{port.name}</strong> - {port.deviceName}</div>
      <div>Status: <span style={{ color: port.status === 'open' ? 'green' : 'red' }}>{port.status}</span></div>
      <div>Upload: {port.upload} KB/s</div>
      <div>Download: {port.download} KB/s</div>
    </div>
  );
};
