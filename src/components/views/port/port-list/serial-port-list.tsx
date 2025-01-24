// src/components/SerialPortList.tsx
import React, { useEffect, useState } from 'react';
import SerialPortListItem from './serial-port-list-item';
import { invoke } from "@tauri-apps/api/core";

interface SerialPort {
  name: string;
  status: 'open' | 'closed';
  upload: number;
  download: number;
  deviceName: string;
}

const SerialPortList: React.FC<{ pollingInterval: number }> = ({ pollingInterval }) => {
  const [ports, setPorts] = useState<SerialPort[]>([]);

  useEffect(() => {
    const fetchPorts = async () => {
      try {
        const result: SerialPort[] = await invoke('get_ports');
        setPorts(result);
      } catch (error) {
        console.error('Error fetching ports:', error);
      }
    };

    fetchPorts();
    const interval = setInterval(fetchPorts, pollingInterval);
    return () => clearInterval(interval);
  }, [pollingInterval]);

  return (
    <div>
      {ports.length === 0 ? (
        <h1 className='info'>No ports available</h1>
      ) : (
        <div className='port-list'>
          {ports.map((port) => (
            <SerialPortListItem key={port.name} port={port}/>
          ))}
        </div>
      )}
    </div>
  );
};

export default SerialPortList;
