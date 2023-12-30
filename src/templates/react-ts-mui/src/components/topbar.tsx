import { useContext } from 'react';
import { ThemeToggleContext } from '../main';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export default function TopBar() {
  const themeToggleContext = useContext(ThemeToggleContext);

  return (
    <AppBar position='sticky'>
      <Toolbar>
        <Typography variant='h5' flexGrow={1}>
          Github Profile Searcher
        </Typography>
        <IconButton onClick={themeToggleContext.toggle}>
          {themeToggleContext.getMode() === 'light' ? (
            <DarkModeIcon />
          ) : (
            <LightModeIcon />
          )}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
