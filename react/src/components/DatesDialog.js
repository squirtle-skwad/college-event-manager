/* eslint no-use-before-define: 0 */

import React, { useEffect, useCallback, useState, } from "react";

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

import { useBoolean } from "react-hanger";
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
            primary={`Start at ${date.start.toLocaleString()}`}
            secondary={`End at ${date.end.toLocaleString()}`}
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
    const { slotEvent, eventAddStep } = useMappedState(
        useCallback((state) => ({
            slotEvent: state.slotEvent,
            eventAddStep: state.eventAddStep,
        }), [])
    );

    const { dates, addDateRange, datesWithEvent, deleteDate } = useDatesManager();

    const newDate = useBoolean(false);
    const [newStart, setStart] = useState('');
    const [newEnd, setEnd] = useState('');

    // -----

    useEffect(() => {
        if (!!slotEvent)
            addDateRange(slotEvent.start, slotEvent.end);
    }, [slotEvent]);

    // -----

    const nextStep = useCallback(() => 
        dispatch(act.INCREMENT_EVENT_ADD_STEP())
    , []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = datesWithEvent(event.id);

        client
            .postMultipleDates(formData)
            .then(nextStep)
            .catch(console.error);
    };

    // -----

    const NewDate = () => (
        <Dialog open={newDate.value}>
            <div style={{ padding: '16px' }}>
                <DatePicker
                    label='Start Date & Time'
                    value={newStart}
                    onChange={(d) => {
                        setStart(d);
                        setEnd(d);
                    }}
                    fullWidth
                />
                <DatePicker
                    value={newEnd}
                    onChange={setEnd}
                    label='End Date & Time'
                    fullWidth
                />
            </div>

            <div className={classes.submitContainer}>
                <Button
                    color='warn'
                    variant='contained'
                    style={{
                        marginRight: '8px'
                    }}
                    onClick={() => newDate.toggle()}>
                    Cancel
                </Button>
                <Button
                    color='primary'
                    variant='contained'
                    type='submit'
                    onClick={() => {
                        addDateRange(newStart, newEnd);
                        newDate.setFalse();
                        setStart(''); setEnd('');
                    }}>
                    Add
                </Button>
            </div>
        </Dialog>
    );

    return (
        <Dialog TransitionComponent={Transition} open={!!event && eventAddStep === 1}>
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
                    style={{
                        marginRight: '8px'
                    }}
                    onClick={() => newDate.toggle()}>
                    <AddIcon />
                    Add Date
                </Button>
                <Button
                    color='primary'
                    variant='contained'
                    type='submit'
                    onClick={handleSubmit}>
                    Submit
                </Button>
            </div>

            <NewDate />
        </Dialog>
    );
}

export default DatesDialog;
