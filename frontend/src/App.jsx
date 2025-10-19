import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import { useState } from 'react';
import Sidebar from "./components/Sidebar";
import Login from "./Login";
import Configs from "./Configs";
import Home from "./Home";

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: { default: '#0b0f19', paper: '#111827' },
    primary: { main: '#60a5fa' },
    secondary: { main: '#a78bfa' },
  },
  shape: { borderRadius: 14 },
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("Guest");
  const handleAuthClick = () => setIsAuthenticated(p => !p);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
          <Sidebar
            userName={userName}
            isAuthenticated={isAuthenticated}
            onAuthClick={handleAuthClick}
          />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/configs" element={<Configs />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
