import React from 'react';
import {
  Stack, Button, Typography, Paper, Box, IconButton
} from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import CloseIcon from '@mui/icons-material/Close';

export default function ImportConfig({
  file = null,
  onChange,      // (file | null) => void
  hint = 'Import an existing configuration file.',
}) {
  const [selected, setSelected] = React.useState(file);
  const inputRef = React.useRef(null);

  const openPicker = () => inputRef.current?.click();

  const handleInput = (e) => {
    const f = e.target.files?.[0] || null;
    if (f) {
      setSelected(f);
      onChange?.(f);
    }
    e.target.value = ''; // allow re-selecting same file later
  };

  const clearFile = () => {
    setSelected(null);
    onChange?.(null);
  };

  return (
    <Stack alignItems="center" justifyContent="center">
      <input
        ref={inputRef}
        type="file"
        style={{ display: 'none' }}
        onChange={handleInput}
      />
      <Typography variant="body2" sx={{ opacity: 0.7, fontSize: '0.85rem' }}>
        {hint}
    </Typography>
    <Button variant="outlined" size="small" startIcon={<UploadIcon />} onClick={openPicker} sx={{ mt: 1, }}>
        Choose file
    </Button>
    

      {selected && (
        <Paper
          variant="outlined"
          sx={{
            px: 1.25,
            py: 0.75,
            mt: 1,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            borderStyle: 'dashed',
          }}
        >
          <Box sx={{ maxWidth: 320, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            <Typography variant="body2" title={selected.name}>
              {selected.name}
            </Typography>
          </Box>
          <IconButton size="small" aria-label="remove file" onClick={clearFile}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Paper>
      )}
    </Stack>
  );
}
