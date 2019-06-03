import React, { useState, useCallback } from 'react';
import _ from 'lodash';
import {
  TextField,
  Button,
  FormControl,
  FormLabel,
  FormGroup,
} from '@material-ui/core';
import { useFormState } from 'react-use-form-state';

import client from 'util/client';
import { PSOS } from 'util/constants';

function AddEventForm() {
  const getInitialPos = useCallback(() => {
    const x = {};
    _.range(13).forEach((e) => {
      x[`PO${e}`] = 0;
      if (e <= 4) { x[`PSO${e}`] = 0; }
    });
    return x;
  }, []);

  const classes = {};

  const [formState, { text, number }] = useFormState({ ...getInitialPos() });
  const [event, setNewEvent] = useState(null);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    const formData = formState.values;

    client.post('/events', formData)
      .then(r => r.data)
      .then(setNewEvent)
      .catch(console.error);
  });

  const PSOForm = () => (
    <FormControl component="fieldset" className={classes.formControl}>
      <FormLabel component="legend">PSO Table</FormLabel>
      <FormGroup row>
        {
                PSOS.map((e, i) => (
                  <TextField
                    {...number(`PSO${i}`)}
                    label={e.label}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    helperText={e.description}
                    margin="normal"
                  />
                ))
            }
      </FormGroup>
    </FormControl>
  );

  return (
    <form autoComplete="off" className={classes.eventForm} onSubmit={handleSubmit}>
      <TextField
        {...text('name')}
        label="Event Name"
        InputLabelProps={{
          shrink: true,
        }}
        fullWidth
        margin="normal"
      />
      <TextField
        {...text('venue')}
        label="Venue"
        InputLabelProps={{
          shrink: true,
        }}
        fullWidth
        margin="normal"
      />
      <TextField
        {...text('description')}
        label="Description"
        InputLabelProps={{
          shrink: true,
        }}
        rowsMax="4"
        multiline
        fullWidth
        margin="normal"
      />
      <TextField
        {...text('organizer')}
        label="Organizer"
        InputLabelProps={{
          shrink: true,
        }}
        fullWidth
        margin="normal"
      />
      <TextField
        {...text('expert_name')}
        label="Expert Name"
        InputLabelProps={{
          shrink: true,
        }}
        fullWidth
        margin="normal"
      />

      {/* <POForm /> */}
      <PSOForm />

      <div className={classes.submitContainer}>
        <Button
          color="secondary"
          variant="contained"
          type="submit"
        >
          Submit
        </Button>
      </div>
    </form>
  );
}

export default AddEventForm;
