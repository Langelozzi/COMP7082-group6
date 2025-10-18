import {
  Drawer,
  Box,
  Typography,
  Paper,
  Stack,
  Avatar,
  Button,
  List,
  ListItemButton,
  ListItemText,
} from '@mui/material';

function Sidebar({
  drawerWidth = 240,
  userName = 'Guest',
  isAuthenticated = false,
  onAuthClick = () => {},
}) {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          bgcolor: 'background.paper',
          borderRight: '1px solid rgba(255,255,255,0.06)',
        },
      }}
    >
      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {/* App/brand */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            textAlign: 'center',
            display: 'block',
            mx: -2,
            px: 2,
            letterSpacing: 0.5,
          }}
        >
          Scrapegoat
        </Typography>

        {/* Account section */}
        <Paper variant="outlined" sx={{ p: 1.5 }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Avatar sx={{ width: 36, height: 36 }} />
            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
              <Typography variant="body2" noWrap>
                {userName}
              </Typography>
            </Box>
            <Button
              size="small"
              variant={isAuthenticated ? 'outlined' : 'contained'}
              onClick={onAuthClick}
            >
              {isAuthenticated ? 'Logout' : 'Login'}
            </Button>
          </Stack>
        </Paper>

        <List dense sx={{ mt: 0.5 }}>
          <ListItemButton selected>
            <ListItemText primary="Home" />
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary="My Configs" />
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );
}

export default Sidebar;
