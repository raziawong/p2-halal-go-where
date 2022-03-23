import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

const pages = ['Explore', 'Create'];

export default class NavBar extends React.Component {
    state = {

    }

    render() {
        return (
            <AppBar position='static'>
              <Container maxWidth='xl'>
                <Toolbar disableGutters>
                  <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton size='large'>
                      <MenuIcon />
                    </IconButton>
                    <Menu
                      id='menu-appbar'
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                      keepMounted
                      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                      sx={{ display: { xs: 'block', md: 'none' } }}
                    >
                      {
                        pages.map((page) => (
                            <MenuItem key={page}>
                                <Typography textAlign='center'>{page}</Typography>
                            </MenuItem>
                        ))
                      }
                    </Menu>
                  </Box>
                  <Typography
                    noWrap
                    component='div'
                    sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                  >
                    LOGO
                  </Typography>
                  <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {
                        pages.map((page) => (
                        <Button
                            key={page}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            {page}
                        </Button>
                        ))
                    }
                  </Box>
                </Toolbar>
              </Container>
            </AppBar>
        );
    }
};
