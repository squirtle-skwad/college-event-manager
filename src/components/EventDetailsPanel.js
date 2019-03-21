import React from 'react';

import { Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from "@material-ui/core";

import {
    ExpandMore as ExpandMoreIcon,
} from "@material-ui/icons";

// name = models.CharField(max_length=128)
// start_date = models.DateField()
// end_date = models.DateField()
// time = models.TimeField()
// department = models.CharField(
//     max_length=6, choices=choices.DEPARTMENT, default="COMPS"
// )
// expert_name = models.CharField(max_length=256)
// description = models.TextField()
// organizer = models.TextField()


function EventDetails({ event }) {
    return (
        <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>
                    { event.title }
                </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                Hi
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
}

export default EventDetails;
