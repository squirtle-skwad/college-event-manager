import React from "react";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Dialog,
  Slide,
  TextField
} from "@material-ui/core";

import { makeStyles } from "@material-ui/styles";

import { Close as CloseIcon } from "@material-ui/icons";

import DatePicker from "./DatePicker";

import useInput from "../util/hooks";

// -----

const useStyles = makeStyles(theme => ({
  closeButton: {
    marginRight: 10
  },
  eventForm: {
    padding: "1rem",
    paddingTop: "0.5rem"
  }
}));

const Transition = props => <Slide direction="up" {...props} />;

function AddEventDialog(props) {
  const classes = useStyles();
  const nameInput = useInput();
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);

  React.useEffect(() => {
    if(!!props.event) {
      setStartDate(props.event.start);
      setEndDate(props.event.end);
    } else {
      setStartDate(null);
      setEndDate(null);
    }
  }, [props.event]);

  return (
    <Dialog TransitionComponent={Transition} open={!!props.event}>
      <div>
        <AppBar color="primary" position="relative">
          <Toolbar variant="dense">
            <IconButton
              onClick={props.onClose}
              color="inherit"
              className={classes.closeButton}
            >
              <CloseIcon />
            </IconButton>

            <Typography variant="h6" color="inherit">
              New Event
            </Typography>
          </Toolbar>
        </AppBar>

        <form autoComplete="off" className={classes.eventForm}>
          <TextField
            label="Event Name"
            InputLabelProps={{
              shrink: true,
            }}
            {...nameInput}
            fullWidth
            margin="normal"
          />
          <DatePicker
           value={startDate}
           onChange={setStartDate}
           label="Start Date & Time"
           fullWidth
          />
          <DatePicker
           value={endDate}
           onChange={setEndDate}
           label="End Date & Time"
           fullWidth
          />
        </form>
        
      </div>
    </Dialog>
  );
}

export default AddEventDialog;
