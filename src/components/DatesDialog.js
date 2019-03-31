import React, { useEffect, useState, useCallback } from "react";

import {
    AppBar,
    Toolbar,
    Typography,
    Dialog,
    Slide,
    TextField,
    Button,
    MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Done as DoneIcon } from "@material-ui/icons";

import client from "../util/client";
import DatePicker from "./DatePicker";
import { DEPARTMENTS } from "../util/constants";
import { act, useDispatch, useMappedState } from "../store";
import { useFormState } from "react-use-form-state";

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

function DatesDialog({ event }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const slotEvent = useMappedState(
        useCallback((state) => state.slotEvent, [])
    );

    // -----

    useEffect(() => {
        if (!!slotEvent) {
            setStartDate(slotEvent.start);
            setEndDate(slotEvent.end);
        } else {
            setStartDate(null);
            setEndDate(null);
        }
    }, [slotEvent]);

    // -----

    const closeDialog = () => dispatch(act.CLOSE_DATES_DIALOG());

    const handleSubmit = (e) => {
        e.preventDefault();

        client.dates
            .post(formData)
            .then(closeDialog)
            .catch(console.error);
    };

    // -----

    return (
        <Dialog TransitionComponent={Transition} open={!!event}>
            <AppBar color='primary' position='sticky'>
                <Toolbar variant='dense' disableGutters>
                    <Typography variant='subtitle1' color='inherit'>
                        Add Dates
                    </Typography>
                </Toolbar>
            </AppBar>

            <div>
            </div>

            <div className={classes.submitContainer}>
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
