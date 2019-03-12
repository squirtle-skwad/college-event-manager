import React from 'react';

import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,

    Dialog,
    Slide,
} from "@material-ui/core";

import { 
    makeStyles,
} from "@material-ui/styles";

import {
    Close as CloseIcon
} from "@material-ui/icons"

// -----

const useStyles = makeStyles({
    closeButton: {
      marginRight: 10,
    },
});

const Transition = (props) => <Slide direction="up" {...props} />;

function DayDialog(props) {
    const classes = useStyles();

    return (
        <Dialog
            fullScreen
            TransitionComponent={Transition}
            open={!!props.event}>

            <AppBar color='secondary'>
                <Toolbar variant='dense'>
                    <IconButton onClick={props.onClose} color="inherit" className={classes.closeButton}>
                        <CloseIcon />
                    </IconButton>

                    <Typography variant="h6" color="inherit">
                        { props.event.start.toDateString() }
                    </Typography>
                </Toolbar>
            </AppBar>

            { JSON.stringify (props.event) }

        </Dialog>
    );
}

export default DayDialog;
