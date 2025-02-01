import React, { createContext, useContext, useState } from 'react';
import { SerialPort } from '../interface';
import { SerialPortContextType } from '../interface';



const SerialPortContext = createContext<SerialPortContextType | undefined>(undefined);

export const SerialPortProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ports, setPorts] = useState<SerialPort[]>([]);

  return (
    <SerialPortContext.Provider value={{ ports, setPorts }}>
      {children}
    </SerialPortContext.Provider>
  );
};

export const useSerialPort = () => {
  const context = useContext(SerialPortContext);
  if (!context) {
    throw new Error('useSerialPort must be used within a SerialPortProvider');
  }
  return context;
};
