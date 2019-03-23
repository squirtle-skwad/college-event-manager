import React, { useCallback, useEffect } from "react";

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
import { useDispatch, useMappedState } from "redux-react-hook";
import { act } from "../store";

// -----

const useStyles = makeStyles({
    closeButton: {
        marginRight: 8,
    },

    fab: {
        position: "fixed",
        bottom: "1rem",
        right: "1rem",
    },
});

const Transition = (props) => <Slide direction='up' {...props} />;

// -----

const AddFab = (props) => (
    <Fab {...props}>
        <AddIcon />
    </Fab>
);

// -----

function DayDialog(props) {
    const classes = useStyles();
    const clickEvent = useMappedState(
        useCallback((state) => state.clickEvent, [])
    );
    const events = useDayEvents(clickEvent);
    const dispatch = useDispatch();

    const addFabOnClick = useCallback(
        () => dispatch(act.ADD_EVENT_FROM_DAY_DIALOG()),
        []
    );
    const closeDialogCallback = useCallback(
        () => dispatch(act.CLOSE_DAY_DIALOG()),
        []
    );
    const escListener = useCallback((event) => {
        if (event.keyCode === 27) dispatch(act.CLOSE_DAY_DIALOG());
    }, []);

    // -----

    useEffect(() => {
        document.addEventListener("keydown", escListener, false);
        return () => document.addEventListener("keydown", escListener, false);
    });

    // -----

    const heading = clickEvent ? clickEvent.start.toDateString() : "Date!";

    const eventPanels = events.list.map((e, i) => (
        <EventDetailsPanel key={i} event={e} />
    ));

    return (
        <Dialog fullScreen TransitionComponent={Transition} open={!!clickEvent}>
            <AppBar color='primary' position='sticky'>
                <Toolbar variant='dense' disableGutters>
                    <IconButton
                        onClick={closeDialogCallback}
                        color='inherit'
                        className={classes.closeButton}>
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
                onClick={addFabOnClick}
            />
        </Dialog>
    );
}

export default DayDialog;
