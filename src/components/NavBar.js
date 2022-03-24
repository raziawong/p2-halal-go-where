import * as React from "react";
import logo from "../assets/image/mgw-logo.svg";
import { Link } from "react-router-dom";
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
import NavDrawer from "./NavDrawer";

export default class NavBar extends React.Component {
  render() {
    return (
      <React.Fragment>
          <AppBar position="static">
            <Toolbar>
              <Link to="/" className="nav-logo">
                <img src={ logo } alt="Muslim Go Where" />
              </Link>
              <div className="nav-link">
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                  <NavDrawer />
                </Box>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                  <Link to="/explore" className="nav-link-item">
                    Explore
                  </Link>
                  {/* <Link to="/curate" className={classes.link}>
                    Curate
                  </Link> */}
                  <Link to="/create" className="nav-link-item">
                    Create
                  </Link>
                </Box>
              </div>
            </Toolbar>
          </AppBar>
      </React.Fragment>
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
