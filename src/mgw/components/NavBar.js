import React from "react";
import logo from "../../assets/image/mgw-logo.svg";
import { NavBarLogo, NavBarLink } from "../utils/mgwStyle";
import { AppBar, Box, Container, Toolbar } from "@mui/material";
import { CollectionsBookmarkSharp, NoteAddSharp, ViewListSharp } from "@mui/icons-material";
import NavDrawer from "./NavDrawer";

export default function NavBar() {
  return (
    <React.Fragment>
        <AppBar position="static">
          <Container maxWidth="xl">
          <Toolbar>
            <NavBarLogo to="/">
              <img src={ logo } alt="Muslim Go Where" />
            </NavBarLogo>
            <Box sx={{ display: "flex", marginLeft: "1rem"}}>
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <NavDrawer />
              </Box>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                <NavBarLink to="/explore">
                  <ViewListSharp fontSize="small" sx={{ mx: 1}} />
                  Explore
                </NavBarLink>
                {/* <Link to="/curate" className={nav-link-item}>
                  <CollectionsBookmarkSharp fontSize="small" /> Curate
                </Link> */}
                <NavBarLink to="/create">
                  <NoteAddSharp fontSize="small" sx={{ mx: 1}} />
                  Create
                </NavBarLink>
              </Box>
            </Box>
          </Toolbar>
          </Container>
        </AppBar>
    </React.Fragment>
  );
}
