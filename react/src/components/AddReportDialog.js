import React, { useCallback, useEffect, useState } from "react";

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
import {
    Close as CloseIcon,
    CloudUpload as UploadIcon,
    FileCopy as FileIcon,
} from "@material-ui/icons";

import client from "../util/client";
import { useFileInput } from "../util/hooks";
import { act, useDispatch, useMappedState } from "../store";
import ImagesDialog from "./ImagesDialog";
import { useFormState } from "react-use-form-state";
import _ from "lodash";

// -----

const useStyles = makeStyles((theme) => ({
    reportForm: {
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

function AddReportDialog() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const reportEvent = useMappedState(
        useCallback((state) => state.reportEvent, [])
    );

    const [formState, { text, url }] = useFormState({
        department: "OTHER",
    });

    const attendanceFile = useFileInput();
    const expertFile = useFileInput();
    
    const [report, setReport] = useState(null);

    // -----

    useEffect(() => {
        document.addEventListener("keydown", escListener, false);
        return () => document.addEventListener("keydown", escListener, false);
    });

    useEffect(() => {
        if(!reportEvent)
            setReport(null)
    }, [reportEvent]);

    // -----

    const closeDialog = useCallback(() => dispatch(act.CLOSE_REPORT_DIALOG()));
    const escListener = useCallback((event) => {
        if (event.keyCode === 27) closeDialog();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        _.forIn(formState.values, (value, key) => formData.append(key, value));
        formData.append('event', reportEvent.id)
        formData.append("attendance", attendanceFile.file);
        formData.append("expert_resume", expertFile.file);

        client.reports
            .post(formData)
            .then(r => r.data)
            .then(setReport)
            .catch(console.error);
    };

    // -----

    return (
        <Dialog TransitionComponent={Transition} open={!!reportEvent}>
            <AppBar color='primary' position='sticky'>
                <Toolbar variant='dense' disableGutters>
                    <IconButton onClick={closeDialog} color='inherit'>
                        <CloseIcon />
                    </IconButton>

                    <Typography variant='subtitle1' color='inherit'>
                        Finalise Report{" "}
                        {reportEvent ? reportEvent.name : "NO EVENT"}
                    </Typography>
                </Toolbar>
            </AppBar>

            <form autoComplete='off' className={classes.reportForm} onSubmit={handleSubmit}>
                <TextField
                    label='Event Name'
                    readOnly
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={reportEvent ? reportEvent.name : "NO EVENT"}
                    fullWidth
                    margin='normal'
                />
                <TextField
                    {...text("number_of_participants")}
                    label='Number of Participants'
                    InputLabelProps={{
                        shrink: true,
                    }}
                    type='number'
                    margin='normal'
                />
                <TextField
                    {...text("after_event_description")}
                    label='After Event Description'
                    InputLabelProps={{
                        shrink: true,
                    }}
                    multiline
                    rows='4'
                    fullWidth
                    margin='normal'
                />
                <TextField
                    {...url("feedback_url")}
                    label='Feedback URL'
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                    margin='normal'
                />

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <Button component='label' color='primary' variant='contained'>
                        <UploadIcon /> Upload Attendance
                        <input
                            { ...attendanceFile.props }
                            name='attendance'
                            accept='image/*'
                            style={{ display: "none" }}
                        />
                    </Button>
                    <span>{ attendanceFile.file ? attendanceFile.file.name : "NO FILE SELECTED" }</span>

                    <Button component='label' color='primary' variant='contained'>
                        <FileIcon /> Upload Expert Resume
                        <input
                            { ...expertFile.props }
                            name='expert'
                            accept='*'
                            style={{ display: "none" }}
                        />
                    </Button>
                    <span>{ expertFile.file ? expertFile.file.name : "NO FILE SELECTED" }</span>
                </div>

                <div className={classes.submitContainer}>
                        <Button
                            color='primary'
                            variant='contained'
                            type='submit'>
                            Submit Report
                        </Button>
                </div>
            </form>

            <ImagesDialog report={report} />
        </Dialog>
    );
}

export default AddReportDialog;
