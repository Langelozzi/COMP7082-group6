// Sidebar.jsx
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
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';

function Sidebar({ drawerWidth = 240 }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useUser();

  const isAuthenticated = Boolean(user);
  const userName = user?.name || user?.username || user?.email || 'Guest';

  const handleAuthClick = async () => {
    if (isAuthenticated) {
      // Log out and send them Home. No global useEffect redirect needed.
      await Promise.resolve(logout?.());
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  const go = (path) => () => navigate(path);

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
              onClick={handleAuthClick}
            >
              {isAuthenticated ? 'Logout' : 'Login'}
            </Button>
          </Stack>
        </Paper>

        {/* Nav list */}
        <List dense sx={{ mt: 0.5 }}>
          <ListItemButton
            selected={location.pathname === '/'}
            onClick={go('/')}
          >
            <ListItemText primary="Home" />
          </ListItemButton>

          <ListItemButton
            selected={location.pathname.startsWith('/configs')}
            onClick={go('/configs')}
          >
            <ListItemText primary="My Configs" />
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );
}

export default Sidebar;
