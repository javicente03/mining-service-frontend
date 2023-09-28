import * as React from 'react';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MailIcon from '@mui/icons-material/MailOutline';
import CommentIcon from '@mui/icons-material/ChatBubbleOutline';
import { Box, IconButton, Tooltip, Avatar, Menu, MenuItem } from '@mui/material';
import SearchNavbar from './searchNavbar';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import { Menu as MenuIcon } from '@mui/icons-material';
import SidebarLessAdmin from '../sidebar/sidebarLess_admin';
import { SidebarAdmin } from '../sidebar/sidebar_admin';

const drawerWidth = 240;

export default function NavbarAdmin({
  child
}: {
  child: React.ReactNode
}): JSX.Element {

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
  const [ openDrawer, setOpenDrawer ] = React.useState(false);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        color='inherit'
        position="fixed"
        // menor a 900
        sx={{ width: { xs: `100%`, md: `calc(100% - ${drawerWidth}px)` },
          ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <SearchNavbar />

          <IconButton>
            <MailIcon fontSize='large'/>
          </IconButton>

          <IconButton>
            <CommentIcon fontSize='large'/>
          </IconButton>
          <Box sx={{ flexGrow: 0 }}
            display={{
              xs: 'none', md: 'block'
            }}
          >
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountCircle fontSize='large' />
                <ArrowDropDown fontSize='small' />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <IconButton sx={{
            display: { xs: 'block', md: 'none' }
          }} onClick={() => setOpenDrawer(true)}>
            <MenuIcon />
          </IconButton>

        </Toolbar>
      </AppBar>

      <SidebarAdmin />
      <SidebarLessAdmin isOpenDrawer={openDrawer} setIsOpenDrawer={setOpenDrawer} />
      
      <Container style={{
        // backgroundColor: '#f5f5f5',
        paddingTop: '80px',
        // height: '100vh',
      }}>
          {child}
      </Container>
      
    </Box>
  );
}