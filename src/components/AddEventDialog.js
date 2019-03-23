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

import axios from "axios";
import DatePicker from "./DatePicker";
import { useInput } from "../util/hooks";
import { DEPARTMENTS, ENDPOINT } from "../util/constants";
import { useDispatch, useMappedState } from "redux-react-hook";
import { act } from "../store";

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

    const nameInput = useInput("");
    const expertInput = useInput("");
    const descInput = useInput("");
    const organizerInput = useInput("");
    const deptInput = useInput("OTHER");
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
            name: nameInput.value,
            start: startDate,
            end: endDate,
            organizer: organizerInput.value,
            department: deptInput.value,
            description: descInput.value,
            expert_name: expertInput.value,
        };

        axios
            .post(ENDPOINT + "/event/", formData)
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
                        label='Event Name'
                        InputLabelProps={{
                            shrink: true,
                        }}
                        {...nameInput}
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
                        select
                        label='Department'
                        InputLabelProps={{
                            shrink: true,
                        }}
                        {...deptInput}
                        helperText="Choose 'Other' if not organized by a specific department"
                        margin='normal'
                    >
                        {DEPARTMENTS.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        label='Description'
                        InputLabelProps={{
                            shrink: true,
                        }}
                        rowsMax='4'
                        multiline
                        {...descInput}
                        fullWidth
                        margin='normal'
                    />
                    <TextField
                        label='Organizer'
                        InputLabelProps={{
                            shrink: true,
                        }}
                        {...organizerInput}
                        fullWidth
                        margin='normal'
                    />
                    <TextField
                        label='Expert Name'
                        InputLabelProps={{
                            shrink: true,
                        }}
                        {...expertInput}
                        fullWidth
                        margin='normal'
                    />
                </form>

                <div className={classes.submitContainer}>
                    <Button
                        color='primary'
                        variant='contained'
                        type='submit'
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </div>
            </div>
        </Dialog>
    );
}

export default AddEventDialog;
