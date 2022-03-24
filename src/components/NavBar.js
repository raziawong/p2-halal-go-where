import React from "react";
import logo from "../assets/image/mgw-logo.svg";
import { Link } from "react-router-dom";
import { AppBar, Box, Toolbar } from "@mui/material";
import NavDrawer from "./NavDrawer";

export default function NavBar() {
  return (
    <React.Fragment>
        <AppBar position="static">
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
