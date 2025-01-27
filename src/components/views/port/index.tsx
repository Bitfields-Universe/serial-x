import React from 'react';
import { SerialPortList } from './port-list/serial-port-list';

export const Port: React.FC = () => {
  return (
    <div className='port-view'>
      <SerialPortList />
    </div>
  );
};