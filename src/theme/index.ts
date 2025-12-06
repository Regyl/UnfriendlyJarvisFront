import {createTheme} from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    accent: Palette['primary'];
  }

  interface PaletteOptions {
    accent?: PaletteOptions['primary'];
  }
}

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#5AE4A7',
      contrastText: '#040b11'
    },
    secondary: {
      main: '#89A3FF',
      contrastText: '#050c16'
    },
    accent: {
      main: '#FFB347'
    },
    background: {
      default: '#02060b',
      paper: '#0f1822'
    },
    text: {
      primary: '#f4f6fb',
      secondary: '#a8b3c7'
    }
  },
  shape: {
    borderRadius: 18
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.75rem',
      fontWeight: 600
    },
    h2: {
      fontSize: '2.1rem',
      fontWeight: 600
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600
    },
    subtitle1: {
      fontWeight: 500
    }
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#101827',
          border: '1px solid rgba(255,255,255,0.04)'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 12
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          border: '1px solid rgba(255,255,255,0.05)'
        }
      }
    }
  }
});

