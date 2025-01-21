import React from "react";

export const Settings: React.FC = () => {
  return (
    <div className="settings">
      <h1>Settings</h1>
      <p>Configure your application preferences here.</p>
      
      <h2>General</h2>
      <ul>
        <li>Theme: <strong>Light</strong></li>
        <li>Language: <strong>English</strong></li>
      </ul>

      <h2>Serial Port</h2>
      <ul>
        <li>Baud Rate: <strong>9600</strong></li>
        <li>Data Bits: <strong>8</strong></li>
      </ul>

      <h2>About</h2>
      <p>Version: 1.0.0</p>
    </div>
  );
};
