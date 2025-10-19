// Home.jsx
import { useState } from 'react';
import ConfigSelection from './components/ConfigSelection.jsx';
import { useNavigate } from 'react-router-dom';
import {
  Box, Paper, Stack, Typography, TextField, Button
} from '@mui/material';

function Home({ isAuthenticated = false, userName = 'Guest' }) {
  const [url, setUrl] = useState('');
  const [flow, setFlow] = useState('new');
  const [selectedConfig, setSelectedConfig] = useState('');
  const [tree, setTree] = useState(null);
  const [retrieval_instructions, setInstructions] = useState([]);
  const navigate = useNavigate();

  // --- fetch / scrape logic ---
  const placeholder_data = {
    root: {
      id: 1,
      tag_type: 'html',
      children: [
        {
          id: 2,
          tag_type: 'h1',
          body: 'No Data Currently Displayed',
          hasData: true,
        },
        {
          id: 3,
          tag_type: 'p',
          body: 'Please enter a URL',
          hasData: true,
        },
      ],
    },
  };

  const buildTree = async () => {
    if (!url) return;
    try {
      const res = await fetch(
        import.meta.env.VITE_API_URL + '/api/v1/scraper/dom-tree/build',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url }),
        }
      );
      const json = await res.json();
      setTree(json.root);
      console.log('Tree built:', json);
    } catch (err) {
      console.error(err);
    }
  };

  const scrape = async () => {
    try {
      const res = await fetch(
        import.meta.env.VITE_API_URL + '/api/v1/scraper/scrape',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            url,
            retrieval_instructions,
          }),
        }
      );
      const json = await res.json();
      console.log('Scraped data:', json);
    } catch (err) {
      console.error(err);
    }
  };

  const addToInstructions = (instruction) =>
    setInstructions((prev) => [...prev, instruction]);

  const handleSetKey = (index, value) => {
    setInstructions((prev) =>
      prev.map((inst, i) =>
        i === index
          ? {
              ...inst,
              output: { ...(inst.output || {}), key: value },
            }
          : inst
      )
    );
  };

  const handleFlowChange = (_, val) => val && setFlow(val);
  const handlePickConfig = (e) => setSelectedConfig(e.target.value);
  const handleRebuild = () => buildTree();

  // --- render ---
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
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  buildTree();
                }
              }}
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

      {/* STEP 2 — Config Selection */}
      <ConfigSelection
        flow={flow}
        onFlowChange={handleFlowChange}
        isAuthenticated={isAuthenticated}
        selectedConfig={selectedConfig}
        onPickConfig={handlePickConfig}
        onRebuild={handleRebuild}
        tree={tree}
        placeholderTree={placeholder_data.root}
        instructions={retrieval_instructions}
        onAddInstruction={addToInstructions}
        onSetKey={handleSetKey}
      />

      {/* Floating Scrape button */}
      <Box
        sx={(theme) => ({
          position: 'fixed',
          right: `max(24px, env(safe-area-inset-right))`,
          bottom: `max(24px, env(safe-area-inset-bottom))`,
          zIndex: theme.zIndex.tooltip + 1,
        })}
      >
        <Button
          variant="contained"
          onClick={scrape}
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
