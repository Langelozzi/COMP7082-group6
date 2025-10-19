// Home.jsx
import { useState } from 'react';
import ConfigSelection from './components/ConfigSelection.jsx';

// MUI
import {
  Box, Paper, Stack, Typography, TextField, Button
} from '@mui/material';

function Home({ isAuthenticated = false, userName = 'Guest' }) {
  const [url, setUrl] = useState('');
  const [flow, setFlow] = useState('import'); // 'import' | 'saved' | 'new'
  const [selectedConfig, setSelectedConfig] = useState('');

  // --- stubs (no functionality) ---
  const handleFlowChange = (_, val) => { if (val) setFlow(val); };
  const handleUploadGoat = () => {};
  const handlePickConfig = (e) => setSelectedConfig(e.target.value);
  const handleRebuild = () => {};
  const handleScrape = () => {};

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

      {/* STEP 2 — Choose how to provide a config (now renders DOM & Selection when flow === 'new') */}
      <ConfigSelection
        flow={flow}
        onFlowChange={handleFlowChange}
        isAuthenticated={isAuthenticated}
        selectedConfig={selectedConfig}
        onPickConfig={handlePickConfig}
        onUploadGoat={handleUploadGoat}
        onRebuild={handleRebuild}
      />

      {/* Scrape CTA */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Button
          variant="contained"
          onClick={handleScrape}
          sx={{ fontSize: '1rem', px: 3, py: 1 }}
        >
          Scrape
        </Button>
      </Box>
    </Box>
  );
}

export default Home;
