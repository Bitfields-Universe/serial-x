import { useEffect } from 'react';
import { Link } from 'react-router';
import { invoke } from "@tauri-apps/api/core";
import { useSerialPort } from '../../../../context/serial-port';
import { SerialPortListItem } from './serial-port-list-item';
import { useSettings } from '../../../../context/settings';


export const SerialPortList: React.FC = () => {
  const { ports, setPorts } = useSerialPort();
  const { showOnlyOpenPorts, setShowOnlyOpenPorts, refreshRate, setRefreshRate } = useSettings();

  useEffect(() => {
    const fetchPorts = async () => {
      try {
        const result: string[] = await invoke('get_ports');
        setPorts(
          result.map((name) => ({
            name,
            status: Math.random() > 0.5 ? 'open' : 'closed',
            upload: '32kB',
            download: '10MB',
            deviceName: 'example',
          }))
        );
      } catch (error) {
        console.error('Error fetching ports:', error);
      }
    };

    fetchPorts();
    const interval = setInterval(fetchPorts, refreshRate * 1000);
    return () => clearInterval(interval);
  }, [refreshRate, setPorts]);

  const filteredPorts = showOnlyOpenPorts ? ports.filter((port) => port.status === 'open') : ports;

  return (
    <div>
      <div className='box'>
        <div className='box'>
          <label htmlFor='show-only-open-ports'>Show only open ports</label>
          <input
            type='checkbox'
            id='show-only-open-ports'
            checked={showOnlyOpenPorts}
            onChange={(e) => {
              setShowOnlyOpenPorts(e.target.checked);
            }}
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
            onChange={(e) => {
              setRefreshRate(Math.min(60, Math.max(1, Number(e.target.value))));
              localStorage.setItem('port-scan-rate', e.target.value.toString());
            }}
          />
        </div>
      </div>
      {filteredPorts.length === 0 ? (
        <h1 className='info'>No ports available</h1>
      ) : (
        <div className='port-list'>
          {filteredPorts.map((port) => (
            <Link key={port.name} to={`/port/${port.name}`}>
              <SerialPortListItem port={port} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
