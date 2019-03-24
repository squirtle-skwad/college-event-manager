import React, { useEffect, useState, useCallback } from "react";

import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Dialog,
    Slide,
    TextField,
    Button,
    MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Close as CloseIcon } from "@material-ui/icons";

import client from "../util/client";
import DatePicker from "./DatePicker";
import { DEPARTMENTS } from "../util/constants";
import { act, useDispatch, useMappedState } from "../store";
import { useFormState } from 'react-use-form-state';

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

function AddEventDialog() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const slotEvent = useMappedState(
        useCallback((state) => state.slotEvent, [])
    );

    const [formState, { text }] = useFormState({
        department: 'OTHER',
    });

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    // -----

    useEffect(() => {
        if (startDate) console.log(startDate.toISOString());
    }, [startDate]);

    useEffect(() => {
        if (!!slotEvent) {
            setStartDate(slotEvent.start);
            setEndDate(slotEvent.end);
        } else {
            setStartDate(null);
            setEndDate(null);
        }
    }, [slotEvent]);

    useEffect(() => {
        document.addEventListener("keydown", escListener, false);
        return () => document.addEventListener("keydown", escListener, false);
    });

    // -----

    const closeDialog = useCallback(() =>
        dispatch(act.CLOSE_ADD_EVENT_DIALOG())
    );
    const escListener = useCallback((event) => {
        if (event.keyCode === 27) closeDialog();
    }, []);

    const handleSubmit = (e) => {
        const formData = {
            ...formState.values,
            start: startDate,
            end: endDate,
        };

        alert(JSON.stringify(formData));

        client.addEvent(formData)
            .then(closeDialog)
            .catch(console.error);
    };

    // -----

    return (
        <Dialog TransitionComponent={Transition} open={!!slotEvent}>
            <div>
                <AppBar color='secondary' position='sticky'>
                    <Toolbar variant='dense' disableGutters>
                        <IconButton onClick={closeDialog} color='inherit'>
                            <CloseIcon />
                        </IconButton>

                        <Typography variant='subtitle1' color='inherit'>
                            New Event
                        </Typography>
                    </Toolbar>
                </AppBar>

                <form autoComplete='off' className={classes.eventForm}>
                    <TextField
                        {...text('name')}
                        label='Event Name'
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth
                        margin='normal'
                    />
                    <DatePicker
                        label='Start Date & Time'
                        value={startDate}
                        onChange={setStartDate}
                        fullWidth
                    />
                    <DatePicker
                        value={endDate}
                        onChange={setEndDate}
                        label='End Date & Time'
                        fullWidth
                    />
                    <TextField
                        {...text('department')}
                        label='Department'
                        select
                        InputLabelProps={{
                            shrink: true,
                        }}
                        helperText="Choose 'Other' if not organized by a specific department"
                        margin='normal'>
                        {DEPARTMENTS.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        {...text('description')}
                        label='Description'
                        InputLabelProps={{
                            shrink: true,
                        }}
                        rowsMax='4'
                        multiline
                        fullWidth
                        margin='normal'
                    />
                    <TextField
                        {...text('organizer')}
                        label='Organizer'
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth
                        margin='normal'
                    />
                    <TextField
                        {...text('expert_name')}
                        label='Expert Name'
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth
                        margin='normal'
                    />
                </form>

                <div className={classes.submitContainer}>
                    <Button
                        color='primary'
                        variant='contained'
                        type='submit'
                        onClick={handleSubmit}>
                        Submit
                    </Button>
                </div>
            </div>
        </Dialog>
    );
}

export default AddEventDialog;
