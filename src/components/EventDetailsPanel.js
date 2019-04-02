import React from "react";

import {
    Button,
    TextField,
    Typography,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
} from "@material-ui/core";
import {
    ExpandMore as ExpandMoreIcon,
    Email as EmailIcon,
    Delete as DeleteIcon,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";

import client from "../util/client";
import { ENDPOINT } from "../util/constants";
import { useUserId } from "../util/hooks";
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

function EventDetails({ event }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const id = useUserId();

    const handleDelete = () => {
        client.reports
            .delete(event.report)
            .then(() => dispatch(act.CLOSE_DAY_DIALOG()));
    };

    const handleEmail = (e) => {
        if(event.report) {
            client.sendEmailToFaculty(event.report)
            .then(() => alert("Email Sent!"));
        }
    };

    // -----

    // If the report has to be filled.
    const FillReportButton = () => id === event.creator && !event.report && (
        <Button
            color='primary'
            variant='contained'
            type='submit'
            onClick={() =>
                dispatch(act.START_ADD_REPORT(event))
            }>
            Fill Report
        </Button>
    );

    const ReportAvailableButtons = () => event.report && (
        <div className={classes.submitContainer}>
            <Button
                color='secondary'
                variant='contained'
                type='submit'
                component='a'
                href={`${ENDPOINT}/report_pdf_preview/${event.report}`}
                style={{
                    marginRight: "1rem",
                }}>
                Preview Report PDF
            </Button>
            <Button
                color='secondary'
                variant='contained'
                type='submit'
                component='a'
                href={`${ENDPOINT}/report_pdf_download/${event.report}`}>
                Download Report PDF
            </Button>
        </div>
    );

    // If the report has been filled.
    const ControlButtons = () => event.report && id === event.creator && (
        <div className={classes.submitContainer}>
            <Button
                color='secondary'
                variant='contained'
                type='submit'
                onClick={handleDelete}
                style={{
                    marginRight: "1rem",
                }}>
                <DeleteIcon /> Delete Report
            </Button>
            <Button
                color='secondary'
                variant='contained'
                type='submit'
                onClick={handleEmail}>
                <EmailIcon /> Email to Faculty
            </Button>
        </div>
    );

    // -----

    return (
        <ExpansionPanel defaultExpanded>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{event.title}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails style={{ flexDirection: "column" }}>
                <TextField
                    label='Venue'
                    value={event.venue}
                    disabled
                    margin='normal'
                    variant='outlined'
                    fullWidth
                />
                <TextField
                    label='Description'
                    value={event.description}
                    disabled
                    margin='normal'
                    variant='outlined'
                    fullWidth
                />
                <TextField
                    label='Department'
                    value={event.department}
                    disabled
                    margin='normal'
                    variant='outlined'
                    fullWidth
                />
                <TextField
                    label='Organizer'
                    value={event.organizer}
                    disabled
                    margin='normal'
                    variant='outlined'
                    fullWidth
                />

                <FillReportButton />
                <ReportAvailableButtons />
                <ControlButtons />
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
}

export default EventDetails;
