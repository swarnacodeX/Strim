// ✅ src/components/Navbar.jsx (Amazon-style Material UI version)
import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Menu,
  MenuItem,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search,
  ShoppingCart,
  AccountCircle,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#131921' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
            <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
              <List>
                <ListItem>
                  <Typography variant="h6">
                    Hello,
                  </Typography>
                </ListItem>
                {['Today\'s Deals', 'Customer Service', 'Registry', 'Gift Cards', 'Sell'].map((text) => (
                  <ListItem button key={text} component={Link} to={`/home/${text.toLowerCase().replace(/ /g, '-')}`}>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>

          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ color: 'white', textDecoration: 'none', mx: 2 }}
          >
            strim.in
          </Typography>

          <Box sx={{ flexGrow: 0.5, display: 'flex', alignItems: 'center'}}>
            <InputBase
              placeholder="Search Strim.in"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ backgroundColor: 'white', pl: 2, flex: 1, borderRadius: '4px 0 0 4px' }}
            />
            <Button
              sx={{ backgroundColor: '#febd69', color: 'black', borderRadius: '0 4px 4px 0' }}
            >
              <Search />
            </Button>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems:'center'}}>
            <IconButton color="inherit" onClick={handleMenu}>
              <AccountCircle />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
              <MenuItem onClick={handleClose} component={Link} to="/home/account">Your Account</MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/home/orders">Your Orders</MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/home/wishlist">Your Wishlist</MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/home/messages">Your Messages</MenuItem>
            </Menu>

            <Button color="inherit" component={Link} to="/orders">
              <Box textAlign="left">
                <Typography variant="caption">Returns</Typography>
                <Typography variant="body2">& Orders</Typography>
              </Box>
            </Button>

            <IconButton color="inherit" component={Link} to="/cart">
              <ShoppingCart />
              <Typography variant="body2" ml={1} display={{ xs: 'none', sm: 'inline' }}>Cart</Typography>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ backgroundColor: '#232f3e', p: 1, display: 'flex', gap: 2, overflowX: 'auto' }}>
        {['Today\'s Deals', 'Customer Service', 'Registry', 'Gift Cards', 'Sell', 'Cart'].map((label) => (
          <Button
            key={label}
            variant="text"
            component={Link}
            to={`/home/${label.toLowerCase().replace(/ /g, '-')}`}
            sx={{ color: 'white', textTransform: 'none' }}
          >
            {label}
          </Button>
        ))}
      </Box>
    </Box>
  );
}
