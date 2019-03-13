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

function AddEventDialog(props) {
    const classes = useStyles();

    return (
        <Dialog
            TransitionComponent={Transition}
            open={!!props.event}>

            <div>

                <AppBar color='secondary' position="relative">
                    <Toolbar variant='dense'>
                        <IconButton onClick={props.onClose} color="inherit" className={classes.closeButton}>
                            <CloseIcon />
                        </IconButton>

                        <Typography variant="h6" color="inherit">
                            New Event
                        </Typography>
                    </Toolbar>
                </AppBar>

                <Typography>
                    { JSON.stringify(props.event) }
                </Typography>

            </div>

        </Dialog>
    );
}

export default AddEventDialog;
