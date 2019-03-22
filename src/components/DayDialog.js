import React from "react";

import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Fab,
    Dialog,
    Slide,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/styles";

import { Add as AddIcon, Close as CloseIcon } from "@material-ui/icons";

import EventDetailsPanel from "./EventDetailsPanel";
import { useDayEvents } from "../util/hooks";

// -----

const useStyles = makeStyles({
    closeButton: {
        marginRight: 8,
    },

    fab: {
        position: "fixed",
        bottom: "1rem",
        right: "auto",
        right: "auto",
    },
});

const Transition = (props) => <Slide direction='up' {...props} />;

const AddFab = (props) => (
    <Fab {...props}>
        <AddIcon />
    </Fab>
);

function DayDialog(props) {
    const classes = useStyles();
    const events = useDayEvents(props.day);

    React.useEffect(() => {
        const escListener = (event) => {
            if (event.keyCode === 27) props.onClose();
        };

        document.addEventListener("keydown", escListener, false);
        return () => document.addEventListener("keydown", escListener, false);
    });

    // ---

    const heading = props.day ? props.day.start.toDateString() : "Date!";

    const eventPanels = events.list.map((e, i) => (
        <EventDetailsPanel key={i} onReport={props.onReport} event={e} />
    ));

    return (
        <Dialog fullScreen TransitionComponent={Transition} open={!!props.day}>
            <AppBar color='primary' position='sticky'>
                <Toolbar variant='dense' disableGutters>
                    <IconButton
                        onClick={props.onClose}
                        color='inherit'
                        className={classes.closeButton}
                    >
                        <CloseIcon />
                    </IconButton>

                    <Typography variant='h6' color='inherit'>
                        {heading}
                    </Typography>
                </Toolbar>
            </AppBar>

            {eventPanels}

            <AddFab
                className={classes.fab}
                color='secondary'
                onClick={props.onAddClick}
            />
        </Dialog>
    );
}

export default DayDialog;
