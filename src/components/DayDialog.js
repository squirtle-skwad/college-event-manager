import React from "react";

import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Fab,
    Dialog,
    Slide,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/styles";

import {
    Add as AddIcon,
    Close as CloseIcon,
    ExpandMore as ExpandMoreIcon,
} from "@material-ui/icons";

import EventDetailsPanel from "./EventDetailsPanel";

// -----

const useStyles = makeStyles({
    closeButton: {
        marginRight: 8,
    },

    fab: {
        position: "absolute",
        bottom: "1rem",
        right: "1rem",
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

    React.useEffect(() => {
        if (props.day)
            console.log("Get data for ", props.day.start.toDateString());
    }, [props.day]);

    React.useEffect(() => {
        const escListener = (event) => {
            if (event.keyCode === 27) props.onClose();
        };

        document.addEventListener("keydown", escListener, false);
        return () => document.addEventListener("keydown", escListener, false);
    });

    // ---

    const heading = props.day ? props.day.start.toDateString() : "Date!";
    const events = props.events || [{}];

    return (
        <Dialog fullScreen TransitionComponent={Transition} open={!!props.day}>
            <AppBar color='primary' position='relative'>
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

            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>
                        Expansion Panel 1
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse malesuada lacus ex, sit amet blandit leo
                        lobortis eget.
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>
                        Expansion Panel 2
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse malesuada lacus ex, sit amet blandit leo
                        lobortis eget.
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>
                        Disabled Expansion Panel
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <EventDetailsPanel event={events[0]} />
                </ExpansionPanelDetails>
            </ExpansionPanel>

            <AddFab
                className={classes.fab}
                color='secondary'
                onClick={() => alert("Hello")}
            />
        </Dialog>
    );
}

export default DayDialog;
