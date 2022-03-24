import React from "react";
import { Link } from "react-router-dom";
import { Drawer, IconButton, List, ListItem, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default class NavDrawer extends React.Component {
  state = {
    opened: false,
  };

  render() {
    return (
      <React.Fragment>
        <Drawer
          className="nav-drawer"
          anchor="right"
          open={this.state.opened}
          onClose={() => this.setState({ opened: false })}
          sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
        >
          <List className="nav-menu">
            <ListItem>
              <ListItemText>
                <Link to="/explore" className="nav-link-item">
                    Explore
                </Link>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <Link to="/create" className="nav-link-item">
                    Create
                </Link>
              </ListItemText>
            </ListItem>
          </List>
        </Drawer>
        <IconButton onClick={() => this.setState({ opened: !this.state.opened })}>
          <MenuIcon />
        </IconButton>
      </React.Fragment>
    );
  }
}
