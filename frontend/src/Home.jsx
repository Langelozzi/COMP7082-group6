// Home.jsx
import { useState } from 'react';
import DomTree from './components/DomTree.jsx';
import Selection from './components/Selection.jsx';

// MUI
import {
  Box, Paper, Stack, Grid, Typography, TextField, Button, Divider,
  ToggleButton, ToggleButtonGroup, Tooltip, IconButton, Select, MenuItem,
  FormControl, InputLabel, Switch, FormControlLabel, Table, TableBody,
  TableHead, TableRow, TableCell
} from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import RefreshIcon from '@mui/icons-material/Refresh';

function Home({ isAuthenticated = false, userName = 'Guest' }) {
  const [url, setUrl] = useState('');
  const [flow, setFlow] = useState('import'); // 'import' | 'saved' | 'new'
  const [selectedConfig, setSelectedConfig] = useState('');
  const [showPreview, setShowPreview] = useState(true);

  // selection for new config
  const [retrievalInstructions, setInstructions] = useState([]);

  // placeholder DOM for empty state
  const placeholderRoot = {
    id: 1,
    tag_type: 'html',
    children: [
      { id: 2, tag_type: 'h1', body: 'No Data Currently Displayed', hasData: true },
      { id: 3, tag_type: 'p', body: 'Please enter a URL', hasData: true },
    ],
  };

  // super tiny preview sample (truncated)
  const previewRows = [
    { title: 'Item A', price: '$12.99', desc: 'Lorem ipsum dolor sit amet...' },
    { title: 'Item B', price: '$9.49', desc: 'Consectetur adipiscing elit...' },
    { title: 'Item C', price: '$5.00', desc: 'Sed do eiusmod tempor...' },
  ];

  // --- stubs (no functionality) ---
  const handleFlowChange = (_, val) => { if (val) setFlow(val); };
  const handleUploadGoat = () => {};
  const handlePickConfig = (e) => setSelectedConfig(e.target.value);
  const handleRebuild = () => {};
  const handleScrape = () => {};
  const handleExport = (_type) => {};

  const addToInstructions = (inst) => setInstructions(prev => [...prev, inst]);
  const handleSetKey = (index, value) => {
    setInstructions(prev =>
      prev.map((inst, i) =>
        i === index ? { ...inst, output: { ...(inst.output || {}), key: value } } : inst
      )
    );
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* STEP 1 — URL (centered and distinct) */}
      <Paper sx={{ p: { xs: 2, md: 3 }, mb: 2 }}>
        <Stack spacing={2} alignItems="center" textAlign="center">
          <Typography variant="overline" sx={{ letterSpacing: 1.2, opacity: 0.7 }}>
            Step 1
          </Typography>
          <Typography variant="h6">Enter Website URL</Typography>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ width: '100%', maxWidth: 760 }}>
              <TextField
                fullWidth
                label="Website URL"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                InputProps={{ sx: { fontSize: 16, py: 1.5 } }}
              />
            </Box>
          </Box>
        </Stack>
      </Paper>

      {/* STEP 2 — Choose how to provide a config */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Stack spacing={2}>
          <Stack alignItems="center" textAlign="center">
            <Typography variant="overline" sx={{ letterSpacing: 1.2, opacity: 0.7 }}>
              Step 2
            </Typography>
            <Typography variant="h6">Choose Configuration Source</Typography>
          </Stack>

          <Stack direction="row" justifyContent="center">
            <ToggleButtonGroup
              value={flow}
              exclusive
              onChange={handleFlowChange}
              size="small"
            >
              <ToggleButton value="import">
                <UploadIcon sx={{ mr: 1 }} /> Import .goat
              </ToggleButton>
              <ToggleButton value="saved">
                <LibraryBooksIcon sx={{ mr: 1 }} /> Saved Config
              </ToggleButton>
              <ToggleButton value="new">
                <AddCircleIcon sx={{ mr: 1 }} /> New Config
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>

          {flow === 'import' && (
            <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
              <Button variant="outlined" startIcon={<UploadIcon />} onClick={handleUploadGoat}>
                Choose .goat file
              </Button>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                Import an existing configuration file.
              </Typography>
            </Stack>
          )}

          {flow === 'saved' && (
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
              <FormControl sx={{ minWidth: 240 }}>
                <InputLabel id="saved-configs">Your Configs</InputLabel>
                <Select
                  labelId="saved-configs"
                  label="Your Configs"
                  value={selectedConfig}
                  onChange={handlePickConfig}
                  disabled={!isAuthenticated}
                >
                  <MenuItem value="config-1">Product List (Example)</MenuItem>
                  <MenuItem value="config-2">Blog Titles (Example)</MenuItem>
                </Select>
              </FormControl>
              {!isAuthenticated && (
                <Tooltip title="Login to access your saved configs">
                  <span>
                    <Button variant="contained" disabled>Login</Button>
                  </span>
                </Tooltip>
              )}
            </Stack>
          )}

          {flow === 'new' && (
            <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
              <Button variant="outlined" startIcon={<RefreshIcon />} onClick={handleRebuild}>
                Build DOM Tree
              </Button>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                Generate the DOM tree to pick elements.
              </Typography>
            </Stack>
          )}
        </Stack>
      </Paper>

      {/* DOM Tree + Selection (only for NEW CONFIG) */}
      {flow === 'new' && (
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} md={7}>
            <Paper sx={{ p: 2, height: '100%' }}>
              <Typography variant="h6" sx={{ mb: 1 }}>DOM Tree</Typography>
              <Divider sx={{ mb: 2, opacity: 0.1 }} />
              <DomTree
                tree={null}
                placeholderRoot={placeholderRoot}
                addToInstructions={addToInstructions}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} md={5}>
            <Paper sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
                <Typography variant="h6">Your Selection</Typography>
                <Tooltip title="Rebuild DOM">
                  <IconButton size="small" onClick={handleRebuild}>
                    <RefreshIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Stack>
              <Divider sx={{ mb: 2, opacity: 0.1 }} />
              <Box sx={{ flex: 1, overflow: 'auto' }}>
                <Selection
                  instructions={retrievalInstructions}
                  onSetKey={handleSetKey}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* STEP 3 — Scrape + Preview + Export */}
      <Paper sx={{ p: 2 }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2}
          alignItems={{ xs: 'stretch', md: 'center' }}
          justifyContent="space-between"
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <Button variant="contained" startIcon={<PlayCircleIcon />} onClick={handleScrape}>
              Scrape
            </Button>
            <Divider orientation="vertical" flexItem sx={{ mx: 1, opacity: 0.15 }} />
            <FormControlLabel
              control={
                <Switch
                  checked={showPreview}
                  onChange={(e) => setShowPreview(e.target.checked)}
                />
              }
              label={
                <Stack direction="row" spacing={1} alignItems="center">
                  <VisibilityIcon fontSize="small" /> <span>Preview</span>
                </Stack>
              }
            />
          </Stack>

          <Stack direction="row" spacing={1}>
            <Button variant="outlined" startIcon={<FileDownloadIcon />} onClick={() => handleExport('csv')}>
              Export CSV
            </Button>
            <Button variant="outlined" startIcon={<FileDownloadIcon />} onClick={() => handleExport('json')}>
              Export JSON
            </Button>
          </Stack>
        </Stack>

        {showPreview && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, opacity: 0.8 }}>
              Preview (truncated)
            </Typography>
            <Paper variant="outlined" sx={{ p: 1 }}>
              <Table size="small" stickyHeader={false}>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {previewRows.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell>{row.title}</TableCell>
                      <TableCell>{row.price}</TableCell>
                      <TableCell sx={{ maxWidth: 420, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {row.desc}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Box>
        )}
      </Paper>
    </Box>
  );
}

export default Home;
