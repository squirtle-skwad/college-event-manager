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
import {
    Close as CloseIcon,
    CloudUpload as UploadIcon,
} from "@material-ui/icons";

import axios from "axios";
import { useInput } from "../util/hooks";
import { ENDPOINT } from "../util/constants";
import ImagesDialog from "./ImagesDialog";

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

function AddReportDialog(props) {
    const classes = useStyles();
    const venueInput = useInput("");
    const participantsInput = useInput("");
    const attendanceRef = React.useRef();
    const descInput = useInput("");
    const [report, setReport] = React.useState(null);

    React.useEffect(() => {
        const escListener = (event) => {
            if (event.keyCode === 27) props.onClose();
        };

        document.addEventListener("keydown", escListener, false);
        return () => document.addEventListener("keydown", escListener, false);
    });

    // -----

    const handleSubmit = (e) => {
        const form = new FormData();
        form.append("event", props.event.id);
        form.append("venue", venueInput.value);
        form.append("number_of_participants", participantsInput.value);
        form.append(
            "attendance",
            attendanceRef.current.files[0],
            attendanceRef.current.files[0].name
        );

        let x = {};
        form.forEach((v, k) => (x[k] = v));
        alert(JSON.stringify(x));

        axios
            .post(ENDPOINT + "/report/", form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(res => res.data)
            .then(setReport)
            .catch(console.error);
    };

    // -----

    return ( 
        <Dialog TransitionComponent={Transition} open={!!props.event}>
            <AppBar color='primary' position='sticky'>
                <Toolbar variant='dense' disableGutters>
                    <IconButton onClick={props.onClose} color='inherit'>
                        <CloseIcon />
                    </IconButton>

                    <Typography variant='subtitle1' color='inherit'>
                        Finalise Report{" "}
                        {props.event ? props.event.name : "NO EVENT"}
                    </Typography>
                </Toolbar>
            </AppBar>

            <form autoComplete='off' className={classes.reportForm}>
                <TextField
                    label='Event Name'
                    readOnly
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={props.event ? props.event.name : "NO EVENT"}
                    fullWidth
                    margin='normal'
                />
                <TextField
                    label='Number of Participants'
                    InputLabelProps={{
                        shrink: true,
                    }}
                    {...participantsInput}
                    type='number'
                    margin='normal'
                />
                <TextField
                    label='Venue'
                    InputLabelProps={{
                        shrink: true,
                    }}
                    {...venueInput}
                    fullWidth
                    margin='normal'
                />
                <TextField
                    label='After Event Description'
                    InputLabelProps={{
                        shrink: true,
                    }}
                    multiline
                    rows='4'
                    {...descInput}
                    fullWidth
                    margin='normal'
                />
                <Button component='label' color='primary' variant='contained'>
                    <UploadIcon /> Upload Attendance
                    <input
                        type='file'
                        name='attendance'
                        accept='image/*'
                        ref={attendanceRef}
                        style={{ display: "none" }}
                    />
                </Button>
            </form>

            <div className={classes.submitContainer}>
                <Button
                    color='primary'
                    variant='contained'
                    type='submit'
                    onClick={handleSubmit}>
                    Submit Report
                </Button>
            </div>

            <ImagesDialog onClose={() => { setReport(null); props.onClose(); }} report={report} />
        </Dialog> 
    );
}

export default AddReportDialog;
