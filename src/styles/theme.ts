import { red } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'
import { Freckle_Face } from '@next/font/google'

export const freckle = Freckle_Face({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
})

// Create a theme instance.
const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#76261C',
          // color: '#dbbc6c',
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: freckle.style.fontFamily,
  },
})

export default theme
