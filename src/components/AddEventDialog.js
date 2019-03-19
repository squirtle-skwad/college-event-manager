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

import DatePicker from "./DatePicker";

import { useInput } from "../util/hooks";
import { DEPARTMENTS } from "../util/constants";

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

// name = models.CharField(max_length=128)
// start_date = models.DateField()
// end_date = models.DateField()
// department = models.CharField(
//     max_length=6, choices=choices.DEPARTMENT, default="COMPS"
// )
// expert_name = models.CharField(max_length=256)
// description = models.TextField()
// organizer = models.TextField()

function AddEventDialog(props) {
    const classes = useStyles();
    const nameInput = useInput();
    const descInput = useInput();
    const organizerInput = useInput();
    const deptInput = useInput();
    const expertInput = useInput();
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

    // -----

    const handleSubmit = (e) => {
        const formData = {
            title: nameInput.value,
            start: startDate,
            end: endDate,
            organizer: organizerInput.value,
            department: deptInput.value,
            description: descInput.value,
            expert_name: expertInput.value,
        };
        alert(JSON.stringify(formData));
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
                        required
                        label='Event Name'
                        InputLabelProps={{
                            shrink: true,
                        }}
                        {...nameInput}
                        fullWidth
                        margin='normal'
                    />
                    <DatePicker
                        required
                        label='Start Date & Time'
                        value={startDate}
                        onChange={setStartDate}
                        fullWidth
                    />
                    <DatePicker
                        required
                        value={endDate}
                        onChange={setEndDate}
                        label='End Date & Time'
                        fullWidth
                    />
                    <TextField
                        required
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
                        required
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
                        required
                        label='Organizer'
                        InputLabelProps={{
                            shrink: true,
                        }}
                        {...organizerInput}
                        fullWidth
                        margin='normal'
                    />
                    <TextField
                        required
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
