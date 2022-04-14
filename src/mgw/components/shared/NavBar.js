import React, { Fragment, useEffect } from "react";
import logo from "../../../assets/image/mgw-logo.svg";
import { NavBarLogo, NavBarLink } from "../../utils/mgwStyle";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { SearchSharp } from "@mui/icons-material";
import NavDrawer from "./NavDrawer";
import helper from "../../utils/helper";
import { useLocation, useNavigate } from "react-router-dom";

export default function NavBar({
  navOpen,
  setMgwState,
  fetchArticles,
  filterOpts,
  setFilterOpts,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const handleSearch = (evt) => {
    const { type, key } = evt;
    if (type === "mousedown" || type === "click" || key === "Enter") {
      fetchArticles(helper.exploreView);
      navigate("/explore");
    }
  };
  useEffect(() => {
    setMgwState({
      navDrawer: false,
    });
  }, [location]);
  return (
    <Fragment>
      <AppBar position="sticky">
        <Container maxWidth="xl">
          <Toolbar component="nav">
            <Box sx={{ position: "relative", flexGrow: 1 }}>
              <NavBarLogo
                to="/"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img src={logo} alt="Muslim Go Where" />
                <Typography>MGW</Typography>
              </NavBarLogo>
            </Box>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <TextField
                name="text"
                arial-label="Search"
                value={filterOpts.text}
                onChange={(evt) => setFilterOpts(evt.target)}
                onKeyDown={handleSearch}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <IconButton
                        aria-label="Submit Search"
                        onClick={handleSearch}
                        onMouseDown={handleSearch}
                        onKeyDown={handleSearch}
                      >
                        <SearchSharp />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                variant="standard"
              />
            </Box>
            <Box sx={{ display: "flex", ml: "1rem" }}>
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <NavDrawer
                  navOpen={navOpen}
                  setMgwState={setMgwState}
                  filterOpts={filterOpts}
                  setFilterOpts={setFilterOpts}
                  handleSearch={handleSearch}
                />
              </Box>
              <List sx={{ display: { xs: "none", md: "inline-flex" } }}>
                <ListItem>
                  <ListItemText>
                    <NavBarLink to="/explore">Explore</NavBarLink>
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    <NavBarLink to="/create">Create</NavBarLink>
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    <NavBarLink to="/collection">Collection</NavBarLink>
                  </ListItemText>
                </ListItem>
              </List>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Fragment>
  );
}
