import { useState } from 'react';
import DomTree from './components/DomTree.jsx';
import Selection from './components/Selection.jsx';

// MUI imports
import {
  Typography, Box, Divider, Stack, TextField, Button,
  Paper, Grid, Tooltip, IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';

function Home() {
  const [url, setUrl] = useState("");
  const [tree, setTree] = useState(null);
  const [retrieval_instructions, setInstructions] = useState([]);

  const placeholder_data = {
    root: {
      id: 1,
      raw: "<html>...</html>",
      tag_type: "html",
      hasData: false,
      htmlAttributes: {},
      body: "",
      children: [
        {
          id: 2,
          raw: "<h1>No Data Currently Displayed<h1/>",
          tag_type: "h1",
          hasData: true,
          htmlAttributes: { class: "text" },
          body: "No Data Currently Displayed",
          retrieval_instructions: []
        },
        {
          id: 3,
          raw: "<p>Please enter a URL<p/>",
          tag_type: "p",
          hasData: true,
          htmlAttributes: { class: "text" },
          body: "Please enter a URL",
          retrieval_instructions: []
        }
      ],
      retrieval_instructions: []
    }
  };

  const buildTree = async function () {
    fetch(import.meta.env.VITE_API_URL + '/api/v1/scraper/dom-tree/build', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url })
    })
      .then(response => response.json())
      .then(json => { setTree(json.root); console.log(json); })
      .catch(error => console.error(error));
  };

  const scrape = async function () {
    console.log(retrieval_instructions);
    fetch(import.meta.env.VITE_API_URL + '/api/v1/scraper/scrape', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url,
        retrieval_instructions,
      })
    })
      .then(response => response.json())
      .then(json => { console.log(json); })
      .catch(error => console.error(error));
  };

  const addToInstructions = (instruction) => {
    setInstructions(prev => [...prev, instruction]);
  };

  const handleSetKey = (index, value) => {
    setInstructions(prev =>
      prev.map((inst, i) =>
        i === index
          ? {
              ...inst,
              output: {
                ...(inst.output || {}),
                key: value,
              },
            }
          : inst
      )
    );
  };

  return (
    <Box sx={{ display: 'block' }}>
      {/* URL input row */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
          <TextField
            fullWidth
            label="Enter website URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') buildTree(); }}
          />
          <Button variant="contained" onClick={buildTree} startIcon={<SearchIcon />}>
            Submit
          </Button>
        </Stack>
      </Paper>

      {/* Two-column content */}
      <Grid container spacing={2}>
        {/* Left: DOM Tree */}
        <Grid item xs={12} md={7}>
          <DomTree
            tree={tree}
            placeholderRoot={placeholder_data.root}
            addToInstructions={addToInstructions}
          />
        </Grid>

        {/* Right: Your Selection */}
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 2, minHeight: 420, display: 'flex', flexDirection: 'column' }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
              <Typography variant="h6">Your Selection</Typography>
              <Tooltip title="Refresh">
                <IconButton size="small"><RefreshIcon fontSize="small" /></IconButton>
              </Tooltip>
            </Stack>
            <Divider sx={{ mb: 2, opacity: 0.1 }} />
            <Box sx={{ flex: 1, overflow: 'auto' }}>
              <Selection
                instructions={retrieval_instructions}
                onSetKey={handleSetKey}
              />
            </Box>
            <Stack direction="row" justifyContent="flex-end" mt={2} spacing={1}>
              <Button variant="outlined" onClick={buildTree}>Rebuild</Button>
              <Button variant="contained" color="secondary" onClick={scrape}>Scrape</Button>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Home;
