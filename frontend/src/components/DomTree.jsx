import TreeNode from './TreeNode.jsx';
import {
  Paper, Stack, Typography, Divider, Box, Tooltip, IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function DomTree({ tree, placeholderRoot, addToInstructions }) {
  return (
    <Paper sx={{ p: 2, minHeight: 420 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
        <Typography variant="h6">DOM Tree</Typography>
        <Stack direction="row" spacing={1}>
          <Tooltip title="Edit"><IconButton size="small"><EditIcon fontSize="small" /></IconButton></Tooltip>
          <Tooltip title="Delete"><IconButton size="small"><DeleteIcon fontSize="small" /></IconButton></Tooltip>
        </Stack>
      </Stack>
      <Divider sx={{ mb: 2, opacity: 0.1 }} />
      <Box sx={{ maxHeight: 520, overflow: 'auto' }}>
        {tree
          ? <TreeNode node={tree} addToInstructions={addToInstructions} />
          : <TreeNode node={placeholderRoot} addToInstructions={addToInstructions} />
        }
      </Box>
    </Paper>
  );
}

export default DomTree;
