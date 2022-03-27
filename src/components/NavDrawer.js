import React from "react";
import { NavBarDrawer, NavBarLink } from "../utils/mgwStyle";
import { Drawer, IconButton, List, ListItem, ListItemText } from "@mui/material";
import { CollectionsBookmarkSharp, HomeSharp, MenuSharp, NoteAddSharp, ViewListSharp } from "@mui/icons-material";

export default class NavDrawer extends React.Component {
  state = {
    opened: false,
  };

  render() {
    return (
      <React.Fragment>
        <NavBarDrawer
          anchor="right"
          open={this.state.opened}
          onClose={() => this.setState({ opened: false })}
        >
          <List sx={{ minWidth: "30vw "}}>
            <ListItem>
              <ListItemText>
                <NavBarLink to="/">
                  <HomeSharp fontSize="small" sx={{ mx: 1}}/>
                  Home
                </NavBarLink>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <NavBarLink to="/explore">
                  <ViewListSharp fontSize="small" sx={{ mx: 1}} />
                  Explore
                </NavBarLink>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <NavBarLink to="/create">
                  <NoteAddSharp fontSize="small" sx={{ mx: 1}} />
                  Create
                </NavBarLink>
              </ListItemText>
            </ListItem>
          </List>
        </NavBarDrawer>
        <IconButton onClick={() => this.setState({ opened: !this.state.opened })}>
          <MenuSharp />
        </IconButton>
      </React.Fragment>
    );
  }
}
