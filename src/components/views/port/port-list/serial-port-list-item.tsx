// src/components/SerialPortListItem.tsx
import React from 'react';

interface SerialPort {
  name: string;
  status: 'open' | 'closed';
  upload: number;
  download: number;
  deviceName: string;
}

const SerialPortListItem: React.FC<{ port: SerialPort }> = ({ port }) => {
  return (
    <div className='port-list-item'>
      <strong>{port.name}</strong> - {port.deviceName}
      <div>Status: <span style={{ color: port.status === 'open' ? 'green' : 'red' }}>{port.status}</span></div>
      <div>Upload: {port.upload} KB/s</div>
      <div>Download: {port.download} KB/s</div>
    </div>
  );
};

export default SerialPortListItem;
