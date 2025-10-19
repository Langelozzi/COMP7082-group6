// Home.jsx
import { useState } from 'react';
import ConfigSelection from './components/ConfigSelection.jsx';
import { useNavigate } from 'react-router-dom';

// MUI
import {
  Box, Paper, Stack, Typography, TextField, Button
} from '@mui/material';

function Home({ isAuthenticated = false, userName = 'Guest' }) {
  const [url, setUrl] = useState('');
  const [flow, setFlow] = useState('new'); // 'new' | 'saved' | 'import'
  const [selectedConfig, setSelectedConfig] = useState('');

  // --- stubs (no functionality) ---
  const handleFlowChange = (_, val) => { if (val) setFlow(val); };
  const handleUploadGoat = () => {};
  const handlePickConfig = (e) => setSelectedConfig(e.target.value);
  const handleRebuild = () => {};

  const navigate = useNavigate();

  return (
    <Box sx={{ p: 1 }}>
      {/* STEP 1 — URL */}
      <Paper sx={{ p: { xs: 2.5, md: 3 }, mb: 2.5 }}>
        <Stack spacing={1} alignItems="center" textAlign="center">
          <Typography
            variant="overline"
            sx={{ letterSpacing: 1.2, opacity: 0.7, mb: 0, lineHeight: 1.2 }}
          >
            Step 1
          </Typography>

          <Typography variant="h6">Enter Website URL</Typography>

          <Box sx={{ width: '100%', maxWidth: 760, mx: 'auto' }}>
            <TextField
              fullWidth
              label="Website URL"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              InputProps={{
                sx: {
                  fontSize: 16,
                  height: 52,
                  '& .MuiInputBase-input': { py: 1, lineHeight: 1.5 },
                },
              }}
            />
          </Box>
        </Stack>
      </Paper>

      {/* STEP 2 - Config Selection */}
      <ConfigSelection
        flow={flow}
        onFlowChange={handleFlowChange}
        isAuthenticated={isAuthenticated}
        selectedConfig={selectedConfig}
        onPickConfig={handlePickConfig}
        onUploadGoat={handleUploadGoat}
        onRebuild={handleRebuild}
      />

      {/* Scrape */}
      <Box
        sx={(theme) => ({
          position: 'fixed',
          right: `max(24px, env(safe-area-inset-right))`,
          bottom: `max(24px, env(safe-area-inset-bottom))`,
          zIndex: theme.zIndex.tooltip + 1, // sits above page content
        })}
      >
        <Button
          variant="contained"
          onClick={() => { navigate('/results') }}
          sx={{
            px: 3,
            py: 1.2,
            borderRadius: 9999,
            fontSize: '1rem',
            boxShadow: 6,
          }}
        >
          Scrape ➔
        </Button>
      </Box>

    </Box>
  );
}

export default Home;
