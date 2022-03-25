import React from "react";
import logo from "../assets/image/mgw-logo.svg";
import { Link } from "react-router-dom";
import { AppBar, Box, Container, Toolbar } from "@mui/material";
import { CollectionsBookmarkSharp, NoteAddSharp, ViewListSharp } from "@mui/icons-material";
import NavDrawer from "./NavDrawer";

export default function NavBar() {
  return (
    <React.Fragment>
        <AppBar position="static">
          <Container maxWidth="xl">
          <Toolbar>
            <Link to="/" className="nav-logo">
              <img src={ logo } alt="Muslim Go Where" />
            </Link>
            <div className="nav-link">
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <NavDrawer />
              </Box>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                <Link to="/explore" className="nav-link-item">
                  <ViewListSharp fontSize="small" sx={{ mx: 1}} />
                  Explore
                </Link>
                {/* <Link to="/curate" className={nav-link-item}>
                  <CollectionsBookmarkSharp fontSize="small" /> Curate
                </Link> */}
                <Link to="/create" className="nav-link-item">
                  <NoteAddSharp fontSize="small" sx={{ mx: 1}} />
                  Create
                </Link>
              </Box>
            </div>
          </Toolbar>
          </Container>
        </AppBar>
    </React.Fragment>
  );
}
