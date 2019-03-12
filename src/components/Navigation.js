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

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -18,
    marginRight: 10,
  },
});

function Navigation() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleMenuClick = () => setOpen(!open);

  return (
    <div className={classes.root}>
      <AppBar
        position="relative"
        color="primary"
      >
        <Toolbar variant="dense">
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            className={classes.menuButton}
            onClick={handleMenuClick}>
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" color="inherit">
            College Events Management
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navigation;
