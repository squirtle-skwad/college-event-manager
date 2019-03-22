import React from "react";

import {
    AppBar,
    Toolbar,
    Typography,
    Dialog,
    Slide,
    Button,
    IconButton,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/styles";
import {
    CloudUpload as UploadIcon,
    Check as DoneIcon,
    Email as EmailIcon,
} from "@material-ui/icons";

import axios from "axios";
import Dropzone from 'react-dropzone';
import { ENDPOINT } from "../util/constants";

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

function ImagesDialog(props) {
    const classes = useStyles();

    // -----

    const handleSubmit = (e) => {
        props.onClose();
    };

    const handleEmail = () => {
        props.onClose();
    };

    const onDrop = (files) => {
        files.forEach(f => {
            const form = new FormData();
            form.append('report', props.report.id);
            form.append('image', f, f.name);
    
            axios
                .post(ENDPOINT + "/image/", form, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .catch(console.error);
        });
    };

    // -----

    return ( 
        <Dialog TransitionComponent={Transition} open={!!props.report}>
            <AppBar color='primary' position='sticky'>
                <Toolbar variant='dense' disableGutters>
                    <IconButton color='inherit'>
                        <UploadIcon />
                    </IconButton>

                    <Typography variant='subtitle1' color='inherit'>
                        Upload images for{" "}
                        {props.report ? props.report.event.name : "NO EVENT"}
                    </Typography>
                </Toolbar>
            </AppBar>

            <Dropzone onDrop={onDrop}>
            {({getRootProps, getInputProps}) => (
                <div {...getRootProps()} width='200px' height='200px' border='1px solid black'>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
            )}
            </Dropzone>

            <div className={classes.submitContainer}>
                <Button
                    color='secondary'
                    variant='contained'
                    type='submit'
                    component='a'
                    href={props.report ? `http://127.0.0.1:8000/send_pdf/${props.report.id}` : '#'}
                    >
                    <EmailIcon /> Email to Faculty
                </Button>
                <Button
                    color='primary'
                    variant='contained'
                    type='submit'
                    onClick={handleSubmit}>
                    <DoneIcon /> Done
                </Button>
            </div>
        </Dialog> 
    );
}

export default ImagesDialog;
