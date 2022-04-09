import React, { Fragment } from "react";
import { NavBarDrawer, NavBarLink } from "../../utils/mgwStyle";
import {
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import {
  HomeSharp,
  MenuSharp,
  NoteAddSharp,
  SearchSharp,
  ViewListSharp,
} from "@mui/icons-material";

export default function NavDrawer({
  navOpen,
  setMgwState,
  filterOpts,
  setFilterOpts,
  handleSearch,
}) {
  const handleClick = () => {
    setMgwState({
      navDrawer: !navOpen,
    });
  };

  const handleClose = () => {
    setMgwState({
      navDrawer: false,
    });
  };

  return (
    <Fragment>
      <NavBarDrawer anchor="right" open={navOpen} onClose={handleClose}>
        <List sx={{ minWidth: "40vw" }}>
          <ListItem sx={{m: 2, display: {xs: "flex", sm: "none"}}}>
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
          </ListItem>
          <ListItem sx={{ mt: 3}}>
            <ListItemText>
              <NavBarLink to="/">
                Home
              </NavBarLink>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <NavBarLink to="/explore">
                Explore
              </NavBarLink>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <NavBarLink to="/create">
                Create
              </NavBarLink>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <NavBarLink to="/collection">
                Collection
              </NavBarLink>
            </ListItemText>
          </ListItem>
        </List>
      </NavBarDrawer>
      <IconButton onClick={handleClick}>
        <MenuSharp />
      </IconButton>
    </Fragment>
  );
}
