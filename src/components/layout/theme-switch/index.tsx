import React, { useState, useEffect } from 'react';
import { ThemeSwitchProps } from '../../../interface';
import { ThemeSwitchButtonProps } from '../../../interface';


export const ThemeSwitch: React.FC<ThemeSwitchProps> = ({ themes = [], storageKey = 'theme' }) => {
  const [currentTheme, setCurrentTheme] = useState<string>(() => {
    const savedTheme = localStorage.getItem(storageKey);
    return savedTheme || themes[0] || '';
  });

  useEffect(() => {
    // Apply the saved or default theme on mount
    document.documentElement.className = currentTheme;
  }, [currentTheme]);

  const switchTheme = () => {
    const currentIndex = themes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    const nextTheme = themes[nextIndex];

    setCurrentTheme(nextTheme);
    localStorage.setItem(storageKey, nextTheme);
  };

  return (
    <div style={{ display: 'inline-block' }}>
      <ThemeSwitchButton currentTheme={currentTheme} switchTheme={switchTheme} />
    </div>
  );
};

export const ThemeSwitchButton: React.FC<ThemeSwitchButtonProps> = ({ switchTheme }) => {
  return (
    <div className='theme-switch'>
      <button onClick={switchTheme}>🖌</button>
    </div>
  );
};
