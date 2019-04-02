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

import client from "../util/client";
import Dropzone from "react-dropzone";
import { useArray } from "react-hanger";
import { act, useDispatch } from "../store";

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
    const dispatch = useDispatch();

    const fileNames = useArray([]);

    // -----

    const handleSubmit = (e) => dispatch(act.CLOSE_IMAGE_DIALOG());
    const handleEmail = (e) => client.sendEmailToFaculty(props.report.id).then(() => alert("Email Sent!"));

    const onDrop = (files) => {
        files.forEach((f) => {
            const formData = new FormData();
            formData.append("report", props.report.id);
            formData.append("image", f, f.name);

            client.images
                .post(formData)
                .then(() => fileNames.add(f.name))
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
                        Upload images
                    </Typography>
                </Toolbar>
            </AppBar>

            <Dropzone onDrop={onDrop}>
                {({ getRootProps, getInputProps }) => (
                    <div
                        {...getRootProps()}
                        style={{
                            minHeight: "200px",
                            minWidth: "200px",
                            height: "inherit",
                            width: "inherit",
                            border: "1px dotted black",
                        }}>
                        <input {...getInputProps()} />
                        <p>
                            Drag 'n' drop some files here, or click to select
                            files
                        </p>
                    </div>
                )}
            </Dropzone>

            <div style={{
                display: "flex",
                flexDirection: "column",
            }}>
                { fileNames.value.map(e => <span>{e.name}</span>) }
            </div>

            <div className={classes.submitContainer}>
                <Button
                    color='secondary'
                    variant='contained'
                    type='submit'
                    onClick={handleEmail}>
                    <EmailIcon /> Email to Faculty
                </Button>
                <Button
                    color='primary'
                    variant='contained'
                    type='submit'
                    onClick={handleSubmit}>
                    <DoneIcon /> Finish Report
                </Button>
            </div>
        </Dialog>
    );
}

export default ImagesDialog;
