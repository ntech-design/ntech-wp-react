import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useColorScheme } from '@mui/material/styles';

interface ColorModeSwitchProps {
  className: string;
}

export const ColorModeSwitch = (props: ColorModeSwitchProps) => {
  const { mode, setMode, systemMode } = useColorScheme();
  const [resolvedMode, setResolvedMode] = useState<'light' | 'dark' | null>(null);

  useEffect(() => {
    if (!mode) return;

    if (mode === 'system') {
      if (systemMode) {
        setResolvedMode(systemMode);
      }
    } else {
      setResolvedMode(mode);
    }
  }, [mode, systemMode]);

  if (!resolvedMode) return null;

  const isDark = resolvedMode === 'dark';
  const handleClick = () => {
    const nextMode = isDark ? 'light' : 'dark';
    setMode(nextMode);
    setResolvedMode(nextMode);
  };

  return (
    <IconButton onClick={handleClick} color="inherit" className={props.className}>
      { isDark ? <LightModeIcon /> : <DarkModeIcon /> }
    </IconButton>
  );
};
