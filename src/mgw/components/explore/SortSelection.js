import React, { Fragment } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import helper from "../../utils/helper";
import { Box } from "@mui/material";

export default function SortSelection({ sortIndex, sortAnchor, setMgwState }) {
  const open = Boolean(sortAnchor);
  const handleClickListItem = (evt) => {
    setMgwState({
      sortMenuAnchor: evt.currentTarget,
    });
  };
  const handleMenuItemClick = (evt, i) => {
    setMgwState({
      sortIndex: i,
      sortMenuAnchor: null,
    });
  };
  const handleClose = () => {
    setMgwState({
      sortMenuAnchor: null,
    });
  };
  return (
    <Fragment>
      <Box sx={{mb: 1}}>
      <List aria-label="Sorting Options" sx={{p:0}}>
        <ListItem button aria-label="sort" sx={{textAlign: "right", py: 0.5, px:0}} onClick={handleClickListItem}>
          <ListItemText
            primary="Sort"
            secondary={helper.sortOptions[sortIndex].label}
          />
        </ListItem>
      </List>
      <Menu
        anchorEl={sortAnchor}
        open={open}
        onClose={handleClose}
        MenuListProps={{ role: "listbox", sx: {minWidth: "30vw"} }}
      >
        {helper.sortOptions.map((opt, i) => (
          <MenuItem
            key={opt.sortField + "-" + opt.sortOrder}
            selected={i === sortIndex}
            onClick={(evt) => handleMenuItemClick(evt, i)}
          >
            {opt.label}
          </MenuItem>
        ))}
      </Menu>
      </Box>
    </Fragment>
  );
}
