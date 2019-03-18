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
} from "@material-ui/core";

import { makeStyles } from "@material-ui/styles";

import { Close as CloseIcon } from "@material-ui/icons";

import DatePicker from "./DatePicker";

import { useInput } from "../util/hooks";

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
    const nameInput = useInput();
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

    return (
        <Dialog TransitionComponent={Transition} open={!!props.event}>
            <div>
                <AppBar color='primary' position='relative'>
                    <Toolbar variant='dense' disableGutters>
                        <IconButton onClick={props.onClose} color='inherit'>
                            <CloseIcon />
                        </IconButton>

                        <Typography variant='h6' color='inherit'>
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
                        value={startDate}
                        onChange={setStartDate}
                        label='Start Date & Time'
                        fullWidth
                    />
                    <DatePicker
                        value={endDate}
                        onChange={setEndDate}
                        label='End Date & Time'
                        fullWidth
                    />
                </form>

                <div className={classes.submitContainer}>
                    <Button color='primary' variant='contained'>
                        {" "}
                        Submit{" "}
                    </Button>
                </div>
            </div>
        </Dialog>
    );
}

export default AddEventDialog;
