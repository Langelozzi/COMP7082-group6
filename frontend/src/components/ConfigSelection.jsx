// components/ConfigSelection.jsx
import React from 'react';
import {
  Paper, Stack, Typography, ToggleButtonGroup, ToggleButton,
  Button, Tooltip, FormControl, InputLabel, Select, MenuItem,
  Grid, Divider, Box, IconButton
} from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RefreshIcon from '@mui/icons-material/Refresh';

// These live in the same folder as this file
import DomTree from './DomTree.jsx';
import Selection from './NodeSelection.jsx';

function ConfigSelection({
  flow,
  onFlowChange,
  isAuthenticated,
  selectedConfig,
  onPickConfig,
  onUploadGoat,
  onRebuild,
}) {
  // ---- Local state for the NEW CONFIG path ----
  const [retrievalInstructions, setInstructions] = React.useState([]);

  // placeholder DOM for empty state
  const placeholderRoot = React.useMemo(() => ({
    id: 1,
    tag_type: 'html',
    children: [
      { id: 2, tag_type: 'h1', body: 'No Data Currently Displayed', hasData: true },
      { id: 3, tag_type: 'p', body: 'Please enter a URL', hasData: true },
    ],
  }), []);

  const addToInstructions = (inst) => setInstructions(prev => [...prev, inst]);
  const handleSetKey = (index, value) => {
    setInstructions(prev =>
      prev.map((inst, i) =>
        i === index ? { ...inst, output: { ...(inst.output || {}), key: value } } : inst
      )
    );
  };

  return (
    <>
      <Paper sx={{ p: 2, mb: 2.5 }}>
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
              onChange={onFlowChange}
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
              <Button variant="outlined" startIcon={<UploadIcon />} onClick={onUploadGoat}>
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
                  onChange={onPickConfig}
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
        </Stack>
      </Paper>

      {/* STEP 3 — New Config authoring (only when flow === 'new') */}
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
                  <IconButton size="small" onClick={onRebuild}>
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
    </>
  );
}

export default ConfigSelection;
