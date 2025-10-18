import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';;
import Navbar from "./components/Navbar"
import Login from "./Login"
import Configs from "./Configs"
import Home from "./Home"

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: { default: '#0b0f19', paper: '#111827' }, // deep dark
    primary: { main: '#60a5fa' },   // soft blue
    secondary: { main: '#a78bfa' }, // purple accents
  },
  shape: { borderRadius: 14 },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/configs" element={<Configs />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App;