import React from 'react';

const useDarkMode = () => {
  const prefersLightMode = () => {
    const lightMode = localStorage.getItem('lightMode');
    return lightMode === 'true';
  };

  const [isDarkMode, setDarkMode] = React.useState(!prefersLightMode());

  React.useEffect(() => {    
    document.body.classList.remove(isDarkMode ? 'light-mode' : 'dark-mode');
    document.body.classList.add(isDarkMode ? 'dark-mode' : 'light-mode');
  }, [isDarkMode]);

  const toggleDarkMode = (checked : boolean) => {
    setDarkMode(checked);
    localStorage.setItem('lightMode', (!checked).toString());
  };

  return { isDarkMode, toggleDarkMode };
};

export default useDarkMode;
