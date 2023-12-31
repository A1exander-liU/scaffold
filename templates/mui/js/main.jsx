import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { createContext, useMemo, useState } from 'react';
import Cookies from 'js-cookie';

const MODE_KEY = 'mode';

export const ThemeToggleContext = createContext({
  toggle: () => {},
  getMode: () => {
    return 'light';
  },
});

function ThemeWrapper() {
  const cookieMode = Cookies.get(MODE_KEY);

  let initial = 'light';

  if (cookieMode === 'light' || cookieMode === 'dark') {
    initial = cookieMode;
  }

  const [mode, setMode] = useState(initial);

  const theme = useMemo(() => {
    return createTheme({
      palette: { mode },
    });
  }, [mode]);

  const toggle = () => {
    let newMode = mode;
    switch (mode) {
      case 'light': {
        Cookies.set(MODE_KEY, 'dark');
        newMode = 'dark';
        break;
      }
      case 'dark': {
        Cookies.set(MODE_KEY, 'light');
        newMode = 'light';
        break;
      }
    }
    setMode(newMode);
  };

  const getMode = () => {
    return mode;
  };

  return (
    <ThemeToggleContext.Provider value={{ toggle, getMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </ThemeToggleContext.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<ThemeWrapper />);
