import React from "react";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from "@material-ui/core";

import { 
  makeStyles,
} from "@material-ui/styles";

import { 
  Menu as MenuIcon,
} from "@material-ui/icons";

// -----

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: 10,
  },
  AppBar: {
    boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
  }
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
        className={classes.AppBar}
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
