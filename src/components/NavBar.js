import * as React from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Outlet, Link } from "react-router-dom";

export default class NavBar extends React.Component {
  state = {};

  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4">
            <Link to="/">
              Navbar
            </Link>
          </Typography>
          <div>
            <Link to="/explore">
              Explore
            </Link>
            {/* <Link to="/curate" className={classes.link}>
              Curate
            </Link> */}
            <Link to="/create">
              Create
            </Link>
          </div>
        </Toolbar>
        <Outlet />
      </AppBar>
    );
  }
}

// export default class NavBar extends React.Component {
//     state = {

//     }

//     classes = componentStyles();
//     pages = ['Explore', 'Create'];

//     render() {
//         return (
//             <AppBar position='static'>
//               <Container maxWidth='xl'>
//                 <Toolbar disableGutters>
//                   <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
//                     <IconButton size='large'>
//                       <MenuIcon />
//                     </IconButton>
//                     <Menu
//                       id='menu-appbar'
//                       anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
//                       keepMounted
//                       transformOrigin={{ vertical: 'top', horizontal: 'left' }}
//                       sx={{ display: { xs: 'block', md: 'none' } }}
//                     >
//                       {
//                         pages.map((page) => (
//                             <MenuItem key={page}>
//                                 <Typography textAlign='center'>{page}</Typography>
//                             </MenuItem>
//                         ))
//                       }
//                     </Menu>
//                   </Box>
//                   <Typography
//                     noWrap
//                     component='div'
//                     sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
//                   >
//                     LOGO
//                   </Typography>
//                   <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
//                     {
//                         pages.map((page) => (
//                         <Button
//                             key={page}
//                             sx={{ my: 2, color: 'white', display: 'block' }}
//                         >
//                             {page}
//                         </Button>
//                         ))
//                     }
//                   </Box>
//                 </Toolbar>
//               </Container>
//             </AppBar>
//         );
//     }
// };
