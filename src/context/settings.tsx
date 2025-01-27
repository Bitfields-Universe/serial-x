import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";

// Define the shape of the SettingsContext
interface SettingsContextProps {
  showOnlyOpenPorts: boolean;
  setShowOnlyOpenPorts: React.Dispatch<React.SetStateAction<boolean>>;
  refreshRate: number;
  setRefreshRate: React.Dispatch<React.SetStateAction<number>>;
  saveSettings: () => Promise<void>;
  loadSettings: () => Promise<void>;
}

// Create the context with a default value
const SettingsContext = createContext<SettingsContextProps | undefined>(undefined);

// Define the props for the SettingsProvider
interface SettingsProviderProps {
  children: ReactNode;
}

// SettingsProvider Component
export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  // Define state variables
  const [showOnlyOpenPorts, setShowOnlyOpenPorts] = useState(false); // Default: false
  const [refreshRate, setRefreshRate] = useState(1000); // Default: 1000ms

  // Function to save settings to a file
  const saveSettings = async () => {
    try {
      const settings = { showOnlyOpenPorts, refreshRate };
      await invoke("save_settings", { settings });
    } catch (error) {
      console.error("Failed to save settings:", error);
    }
  };

  // Function to load settings from a file
  const loadSettings = async () => {
    try {
      const settings = await invoke<{ showOnlyOpenPorts: boolean; refreshRate: number }>("load_settings");
      setShowOnlyOpenPorts(settings.showOnlyOpenPorts);
      setRefreshRate(settings.refreshRate);
    } catch (error) {
      console.error("Failed to load settings:", error);
    }
  };

  // Load settings when the component mounts
  useEffect(() => {
    loadSettings();
  }, []);

  // Value provided to the context
  const value: SettingsContextProps = {
    showOnlyOpenPorts,
    setShowOnlyOpenPorts,
    refreshRate,
    setRefreshRate,
    saveSettings,
    loadSettings,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
