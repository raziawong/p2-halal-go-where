import React, { Fragment } from "react";
import helper from "../../utils/helper";
import { Box, List, ListItem, ListItemText, Menu, MenuItem } from "@mui/material";
import { ArrowDropUpSharp, ArrowDropDownSharp } from "@mui/icons-material"

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
        <ListItem button aria-label="sort" sx={{ px:0}} 
        secondaryAction={
            open ? <ArrowDropUpSharp/> : <ArrowDropDownSharp />
        }
        onClick={handleClickListItem}>
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
        MenuListProps={{ role: "listbox", sx: {minWidth: {xs:"93vw", md: "30vw"} } }}
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
