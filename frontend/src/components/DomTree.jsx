// components/DomTree.jsx
import TreeNode from './TreeNode.jsx';
import {
  Paper, Stack, Typography, Divider, Box, Tooltip, IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function DomTree({ tree, placeholderRoot, addToInstructions }) {
  return (
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', minHeight: 0, height: '100%' }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1} sx={{ flexShrink: 0 }}>
        <Typography variant="h6">DOM Tree</Typography>
      </Stack>
      <Box sx={{ flex: 1, minHeight: 0, overflow: 'auto' }}>
        {tree
          ? <TreeNode node={tree} addToInstructions={addToInstructions} />
          : <TreeNode node={placeholderRoot} addToInstructions={addToInstructions} />
        }
      </Box>
    </Paper>
  );
}

export default DomTree;
