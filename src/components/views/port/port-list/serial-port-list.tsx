import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { invoke } from "@tauri-apps/api/core";
import { SerialPortListItem } from './serial-port-list-item';
import { useSerialPort } from '../../../../context/serial-port';

export const SerialPortList: React.FC = () => {
  const { ports, setPorts } = useSerialPort();

  const getRefreshRate = () => Number(localStorage.getItem('port-scan-rate')) || 10;
  const getShowOnlyOpenPorts = () => localStorage.getItem('show-only-open-ports') === 'true';

  const [refreshRate, setRefreshRateState] = useState(getRefreshRate);
  const [showOnlyOpenPorts, setShowOnlyOpenPortsState] = useState(getShowOnlyOpenPorts);

  useEffect(() => {
    localStorage.setItem('port-scan-rate', refreshRate.toString());
  }, [refreshRate]);

  useEffect(() => {
    localStorage.setItem('show-only-open-ports', showOnlyOpenPorts.toString());
  }, [showOnlyOpenPorts]);

  useEffect(() => {
    const fetchPorts = async () => {
      try {
        const result: string[] = await invoke('list_ports');

        console.log(result);
        
        setPorts(
          result.map((portData) => (JSON.parse(portData)))
        );
      } catch (error) {
        console.error('Error fetching ports:', error);
      }
    };

    fetchPorts();
    const interval = setInterval(fetchPorts, refreshRate * 1000);
    return () => clearInterval(interval);
  }, [refreshRate, setPorts]);

  const filteredPorts = showOnlyOpenPorts ? ports.filter((port) => port.status === true) : ports;

  return (
    <div className='port-view'>
      <div className='box'>
        <div className='box'>
          <label htmlFor='show-only-open-ports'>Show only open ports</label>
          <input
            type='checkbox'
            id='show-only-open-ports'
            checked={showOnlyOpenPorts}
            onChange={(e) => setShowOnlyOpenPortsState(e.target.checked)}
          />
        </div>
        <div className='separator'></div>
        <div className='box'>
          <label htmlFor='refresh-rate'>Scan interval</label>
          <input
            type='number'
            id='refresh-rate'
            value={refreshRate}
            min={1}
            max={60}
            onChange={(e) => setRefreshRateState(Math.min(60, Math.max(1, Number(e.target.value))))}
          />
        </div>
      </div>
      {filteredPorts.length === 0 ? (
        <h1 className='info'>No ports available</h1>
      ) : (
        <div className='port-list'>
          {filteredPorts.map((port) => (
            <Link key={port.name} to={`/port/${port.id}`}>
              <SerialPortListItem port={port} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
