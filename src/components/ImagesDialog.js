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
} from "@material-ui/icons";

import axios from "axios";
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
        const form = new FormData();
        // form.append()

        // axios
        //     .post(ENDPOINT + "/image/", form, {
        //         headers: {
        //             "Content-Type": "multipart/form-data",
        //         },
        //     })
        //     .then(res => res.data)
        //     .then(props.onClose)
        //     .catch(console.error);

        props.onClose();
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
                        {props.event ? props.event.name : "NO EVENT"}
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* Drop zone */}

            <div className={classes.submitContainer}>
                <Button
                    color='primary'
                    component='label'
                    variant='contained'
                    type='submit'
                    onClick={handleSubmit}>
                    <UploadIcon /> Upload
                </Button>
            </div>
        </Dialog> 
    );
}

export default ImagesDialog;
