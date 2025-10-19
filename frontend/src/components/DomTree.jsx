// components/DomTree.jsx
import TreeNode from './TreeNode.jsx';
import { Paper, Stack, Typography, Box } from '@mui/material';

function DomTree({ tree, placeholderRoot, addToInstructions }) {
  return (
    <Paper
      sx={{
        p: 0, // remove Paper padding so it matches node structure
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        bgcolor: 'background.paper',
      }}
    >
      {/* Header with matching horizontal padding */}
      <Box
        sx={{
          px: 3, // match TreeNode’s padding
          py: 2,
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          flexShrink: 0,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          DOM Tree
        </Typography>
      </Box>

      {/* Scrollable tree area */}
      <Box sx={{ flex: 1, overflow: 'auto', p: 3, pt: 2 }}>
        {tree ? (
          <TreeNode node={tree} addToInstructions={addToInstructions} />
        ) : (
          <TreeNode node={placeholderRoot} addToInstructions={addToInstructions} />
        )}
      </Box>
    </Paper>
  );
}

export default DomTree;
