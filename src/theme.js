import { createTheme } from '@mui/material/styles';

const softSkyBlueTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#5AB4F2',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#0288d1',
    },
    background: {
      default: '#e6f4fc',
      paper: '#d0ecfb', 
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 8,
  },
});

export default softSkyBlueTheme;
