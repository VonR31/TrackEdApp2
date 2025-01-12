import React from 'react';
import { Switch } from 'antd';

function ToggleThemeButton({ lightTheme, toggleTheme }) {
  return (
    <div className="flex items-center justify-center">
      <span className="mr-2">Dark Mode</span>
      <Switch checked={!lightTheme} onChange={toggleTheme} />
    </div>
  );
}

export default ToggleThemeButton;
