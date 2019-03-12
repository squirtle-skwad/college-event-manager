import React from "react";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@material-ui/core";

import { 
  useTheme,
  makeStyles,
} from "@material-ui/styles";

import { 
  Menu as MenuIcon,
  CalendarToday as CalendarIcon
} from "@material-ui/icons";

import classNames from "classnames";

// -----

function Navigation() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <div>
      <AppBar
        position="fixed"
        color="primary"
      >
        <Toolbar variant="dense">
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}>
            <CalendarIcon /> 
            {/* MenuIcon here */}
          </IconButton>

          <Typography variant="h6" color="inherit" noWrap>
            College Events Management
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navigation;
