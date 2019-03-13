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

    React.useEffect(() => {
        if(props.event)
            console.log("Get data for ", props.event.start.toDateString());
    }, [props.event]);

    const heading = props.event ? props.event.start.toDateString() : "Date!"

    return (
        <Dialog
            fullScreen
            TransitionComponent={Transition}
            open={!!props.event}>

            <AppBar color='secondary' position="relative">
                <Toolbar variant='dense'>
                    <IconButton onClick={props.onClose} color="inherit" className={classes.closeButton}>
                        <CloseIcon />
                    </IconButton>

                    <Typography variant="h6" color="inherit">
                        { heading }
                    </Typography>
                </Toolbar>
            </AppBar>

            <Typography>
                { JSON.stringify(props.event) }
            </Typography>

        </Dialog>
    );
}

export default DayDialog;
