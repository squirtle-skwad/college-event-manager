/* eslint no-use-before-define: 0 */

import React, { useEffect, useCallback } from "react";

import {
    AppBar,
    Toolbar,
    Typography,
    Dialog,
    Slide,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Add as AddIcon, Delete as DeleteIcon } from "@material-ui/icons";

import DatePicker from "./DatePicker";
import client from "../util/client";
import { useDatesManager } from "../util/hooks";
import { act, useDispatch, useMappedState } from "../store";

// -----

const useStyles = makeStyles((theme) => ({
    eventForm: {
        padding: "1rem",
        paddingTop: "0.5rem",
    },

    submitContainer: {
        padding: "16px",
        display: "flex",
        justifyContent: "flex-end",
    },

    submitButton: {
        position: "absolute",
        right: "1rem",
        bottom: "0",
    },
}));

const Transition = (props) => <Slide direction='up' {...props} />;

// -----

const DateItem = ({ date, index, onDelete }) => (
    <ListItem>
        <ListItemText
            primary={`${date.start.toDateString()} to ${date.end.toDateString()}`}
        />
        <ListItemSecondaryAction>
            <IconButton aria-label="Delete" onClick={onDelete}>
                <DeleteIcon />
            </IconButton>
        </ListItemSecondaryAction>
    </ListItem>
);

function DatesDialog({ event }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const slotEvent = useMappedState(
        useCallback((state) => state.slotEvent, [])
    );

    const { dates, addDateRange, datesWithEvent, deleteDate } = useDatesManager();

    // -----

    useEffect(() => {
        if (!!slotEvent)
            addDateRange(new Date(slotEvent.start), new Date(slotEvent.end));
    }, [slotEvent]);

    // -----

    const closeDialog = () => dispatch(act.CLOSE_DATES_DIALOG());

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = null;

        client.dates
            .post(formData)
            .then(closeDialog)
            .catch(console.error);
    };

    // -----

    return (
        <Dialog TransitionComponent={Transition} open={!!event || true}>
            <AppBar color='primary' position='sticky'>
                <Toolbar variant='dense' disableGutters>
                    <Typography variant='subtitle1' color='inherit' style={{ marginLeft: "16px" }}>
                        Add Dates
                    </Typography>
                </Toolbar>
            </AppBar>

            <div>
                <List dense>
                    {dates.map((e, i) => <DateItem key={i} index={i} date={e} onDelete={() => deleteDate(i)} />)}
                </List>
            </div>

            <div className={classes.submitContainer}>
                <Button
                    color='secondary'
                    variant='contained'
                    type='submit'>
                    <AddIcon />
                    Add Date
                </Button>
                <Button
                    color='primary'
                    variant='contained'
                    type='submit'>
                    Submit
                </Button>
            </div>
        </Dialog>
    );
}

export default DatesDialog;
