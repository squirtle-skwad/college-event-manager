import React from "react";

import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Dialog,
    Slide,
    TextField,
    Button,
    MenuItem
} from "@material-ui/core";

import { makeStyles } from "@material-ui/styles";
import { Close as CloseIcon } from "@material-ui/icons";

import axios from 'axios';
import DatePicker from "./DatePicker";
import { useInput } from "../util/hooks";
import { DEPARTMENTS, ENDPOINT } from "../util/constants";

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

function AddEventDialog(props) {
    const classes = useStyles();
    const nameInput = useInput('');
    const expertInput = useInput('');
    const descInput = useInput('');
    const organizerInput = useInput('');
    const deptInput = useInput("OTHER");
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);

    React.useEffect(() => {
        if (!!props.event) {
            setStartDate(props.event.start);
            setEndDate(props.event.end);
        } else {
            setStartDate(null);
            setEndDate(null);
        }
    }, [props.event]);

    React.useEffect(() => {
        const escListener = (event) => {
            if (event.keyCode === 27) props.onClose();
        };

        document.addEventListener("keydown", escListener, false);
        return () => document.addEventListener("keydown", escListener, false);
    });

    // -----

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

        axios.post(ENDPOINT + '/event_custom/', formData)
        .then(props.onClose)
        .catch(console.error);
    };

    // -----

    return (
        <Dialog TransitionComponent={Transition} open={!!props.event}>
            <div>
                <AppBar color='primary' position='relative'>
                    <Toolbar variant='dense' disableGutters>
                        <IconButton onClick={props.onClose} color='inherit'>
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
                        label="Department"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        {...deptInput}
                        helperText="Choose 'Other' if not organized by a specific department"
                        margin="normal"
                    >
                      {DEPARTMENTS.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                        label="Description"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        rowsMax="4"
                        multiline
                        {...descInput}
                        fullWidth
                        margin="normal"
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
                    <Button color='primary' variant='contained' type='submit' onClick={handleSubmit}>
                        Submit
                    </Button>
                </div>
            </div>
        </Dialog>
    );
}

export default AddEventDialog;
