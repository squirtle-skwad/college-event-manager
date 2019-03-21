import React from 'react';

import { TextField, Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from "@material-ui/core";

import {
    ExpandMore as ExpandMoreIcon,
} from "@material-ui/icons";

const toTime = (d) => `${d.getHours()}:${d.getMinutes()}`;

function EventDetails({ event }) {

    return (
        <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>
                    { event.title }
                </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails style={{ flexDirection: "column" }} >
                <TextField
                    label='Start Time'
                    value={toTime(event.start)}
                    disabled
                    margin="normal"
                    variant="outlined"
                    fullWidth
                />
                <TextField
                    label='End Time'
                    value={toTime(event.end)}
                    disabled
                    margin="normal"
                    variant="outlined"
                    fullWidth
                />
                <TextField
                    label='Description'
                    value={event.description}
                    disabled
                    margin="normal"
                    variant="outlined"
                    fullWidth
                />
                <TextField
                    label='Department'
                    value={event.department}
                    disabled
                    margin="normal"
                    variant="outlined"
                    fullWidth
                />
                <TextField
                    label='Organizer'
                    value={event.organizer}
                    disabled
                    margin="normal"
                    variant="outlined"
                    fullWidth
                />
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
}

export default EventDetails;
