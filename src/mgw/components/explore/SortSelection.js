import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import helper from '../../utils/helper';

export default function SortSelection({
    sortIndex,
    sortAnchor,
    setMgwState
}) {
  const open = Boolean(sortAnchor);
  const handleClickListItem = (evt) => {
    setMgwState({
        sortMenuAnchor: evt.currentTarget
    });
  };
  const handleMenuItemClick = (evt, i) => {
    setMgwState({
        sortIndex: i,
        sortMenuAnchor: null
    });
  };
  const handleClose = () => {
    setMgwState({
        sortMenuAnchor: null
    });
  };
  return (
    <div>
      <List
        component="nav"
        aria-label="Sorting Optionss"
        sx={{ bgcolor: 'background.paper' }}
      >
        <ListItem
          button
          aria-label="sort"
          onClick={handleClickListItem}
        >
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
        MenuListProps={{role: 'listbox'}}
      >
        {helper.sortOptions.map((opt, i) => (
          <MenuItem
            key={opt.sortField + '-' + opt.sortOrder}
            selected={i === sortIndex}
            onClick={(evt) => handleMenuItemClick(evt, i)}
          >
            {opt.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}