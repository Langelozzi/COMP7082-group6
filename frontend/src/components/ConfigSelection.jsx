import React from 'react';
import {
  Paper, Stack, Typography, ToggleButtonGroup, ToggleButton,
  Box
} from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import DomTree from './DomTree.jsx';
import Selection from './NodeSelection.jsx';
import ImportConfig from './ImportConfig.jsx';

function ConfigSelection({
  flow,
  onFlowChange,
  isAuthenticated,
  selectedConfig,
  onPickConfig,
  onRebuild,
}) {
  const [retrievalInstructions, setInstructions] = React.useState([]);
  const [importedFile, setImportedFile] = React.useState(null);

  const placeholderRoot = React.useMemo(
    () => ({
      id: 1,
      tag_type: 'html',
      children: [
        { id: 2, tag_type: 'h1', body: 'No Data Currently Displayed', hasData: true },
        { id: 3, tag_type: 'p', body: 'Please enter a URL', hasData: true },
      ],
    }),
    []
  );

  const addToInstructions = (inst) => setInstructions((prev) => [...prev, inst]);

  const handleSetKey = (index, value) =>
    setInstructions((prev) =>
      prev.map((inst, i) =>
        i === index ? { ...inst, output: { ...(inst.output || {}), key: value } } : inst
      )
    );

  const handleImportChange = (fileOrNull) => {
    setImportedFile(fileOrNull);
  };

  return (
    <>
      <Paper sx={{ p: 2.5, pb: 3, mb: 2 }}>
        <Stack spacing={1.8}>
          <Stack alignItems="center" textAlign="center" spacing={0.5}>
            <Typography variant="overline" sx={{ letterSpacing: 1.2, opacity: 0.7 }}>
              Step 2
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 500 }}>
              Choose Configuration Source
            </Typography>
          </Stack>

          {/* Toggle group */}
          <Stack direction="row" justifyContent="center">
            <ToggleButtonGroup value={flow} exclusive onChange={onFlowChange} size="small">
              <ToggleButton value="new">
                <AddCircleIcon sx={{ mr: 1 }} />
                New Config
              </ToggleButton>
              <ToggleButton value="saved">
                <LibraryBooksIcon sx={{ mr: 1 }} />
                Saved Config
              </ToggleButton>
              <ToggleButton value="import">
                <UploadIcon sx={{ mr: 1 }} />
                Import .GOAT
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>

          {flow === 'saved' && (
            <Typography variant="body2" sx={{ opacity: 0.7, fontSize: '0.85rem', width: '100%', mx: 'auto', textAlign: 'center' }}>
              Log in to see your saved configurations!
                </Typography>
          )}

          {flow === 'import' && (
            <ImportConfig
              file={importedFile}
              onChange={handleImportChange}
              hint="Import an existing configuration file."
            />
          )}
        </Stack>
      </Paper>

      {flow === 'new' && (
        <>
          <Box
            sx={{
              height: '100vh',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              px: 2,
              boxSizing: 'border-box',
            }}
          >
            <DomTree
              tree={null}
              placeholderRoot={placeholderRoot}
              addToInstructions={addToInstructions}
            />
          </Box>

          <Box
            sx={{
              height: '100vh',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              p: 2,
              boxSizing: 'border-box',
            }}
          >
            <Paper
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  px: 3,
                  py: 2,
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                  flexShrink: 0,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Your Selection
                </Typography>
              </Box>

              <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
                <Selection instructions={retrievalInstructions} onSetKey={handleSetKey} />
              </Box>
            </Paper>
          </Box>
        </>
      )}
    </>
  );
}

export default ConfigSelection;
