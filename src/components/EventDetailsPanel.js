import React from 'react';

import { Typography, } from "@material-ui/core";

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
    console.log(event);

    return (
        <div style={{
            height: "inherit",
            width: "inherit"
        }}>
            <Typography variant="h5">
                Title
            </Typography>
            <Typography variant="h5">
                { event.title } 
            </Typography>
        </div>
    );
}

export default EventDetails;
