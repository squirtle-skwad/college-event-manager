import React from "react";

import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { CalendarToday as MenuIcon, AccountCircle } from "@material-ui/icons";

import { useAuthToken } from "../util/hooks";
import { Link } from "react-router-dom";

// -----

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: 10,
    },
    grow: {
        flexGrow: 1,
    },
    AppBar: {
        boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
    },
});

function Navigation() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    
    const open = Boolean(anchorEl);
    const handleMenu = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const handleLogout = () => localStorage.removeItem('auth_token');

    return (
        <div className={classes.root}>
            <AppBar
                position='sticky'
                color='secondary'
                className={classes.AppBar}>
                <Toolbar variant='dense'>
                    <IconButton
                        color='inherit'
                        aria-label='Open drawer'
                        className={classes.menuButton}>
                        <MenuIcon />
                    </IconButton>

                    <Typography variant='h6' color='inherit' className={classes.grow}>
                        College Events Management
                    </Typography>

                    {
                        !!useAuthToken() && 
                        <div>
                            <IconButton
                                aria-owns={open ? 'menu-appbar' : undefined}
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit">
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                                }}
                                transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem component={Link} to='/login' onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </div>
                    }
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Navigation;
