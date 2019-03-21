import React from "react";

import {
    Button,
    TextField,
    Typography,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
} from "@material-ui/core";

import { ExpandMore as ExpandMoreIcon } from "@material-ui/icons";

import { makeStyles } from "@material-ui/styles";


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

const toTime = (d) => `${d.getHours()}:${d.getMinutes()}`;

function EventDetails({ event }) {
    const classes = useStyles();

    return (
        <ExpansionPanel defaultExpanded>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{event.title}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails style={{ flexDirection: "column" }}>
                <TextField
                    label='Start Time'
                    value={toTime(event.start)}
                    disabled
                    margin='normal'
                    variant='outlined'
                    fullWidth
                />
                <TextField
                    label='End Time'
                    value={toTime(event.end)}
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

                <div className={classes.submitContainer}>
                    <Button color='primary' variant='contained' type='submit'>
                        {event.report ? "Download Report PDF" : "Fill Report"}
                    </Button>
                </div>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
}

export default EventDetails;
