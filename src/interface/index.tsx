export interface SerialPort {
    id: string;
    name: string;
    status: boolean;
    upload: string;
    download: string;
    deviceName: string;
}

export interface SerialPortContextType {
    ports: SerialPort[];
    setPorts: (ports: SerialPort[]) => void;
}

export interface DataTypeSelectProps {
    value: string;
    onChange: (value: string) => void;
}


export interface Variable {
    id: number;
    name: string;
    type: string;
  }

export interface VariableNameInputProps {
    value: string;
    onChange: (value: string) => void;
}

export interface ThemeSwitchProps {
    themes?: string[];
    storageKey?: string;
}

export interface ThemeSwitchButtonProps {
    currentTheme: string;
    switchTheme: () => void;
}
