import React from 'react';
import {
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  Box,
  useTheme,
  Typography,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/picture.png'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Header = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    navigate('/');
  };

  const handleCreateAccount = () => {
    handleMenuClose();
    navigate('/create-account');
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "#eeeeee",
        color: theme.palette.text.primary,
        borderBottom: `1px solid ${theme.palette.divider}`,
        zIndex: theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <img alt='logo' src={logo} width='150px' />
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="subtitle1" onClick={handleMenuOpen} color="textPrimary">
            Arun
          </Typography>
          <IconButton onClick={handleMenuOpen} color="inherit" sx={{ p: 0 }}>
            <ArrowDropDownIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem disabled>Arun</MenuItem>
            <MenuItem onClick={handleCreateAccount}>Create Account</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>

  );
};

export default Header;
