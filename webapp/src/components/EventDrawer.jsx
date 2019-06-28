import React, { useCallback, useEffect } from 'react';

import {
  Fab,
  Drawer,
  List,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Add as AddIcon } from '@material-ui/icons';

import EventDetailsPanel from 'components/EventDetailsPanel';
import { useDayEvents } from 'util/hooks';
import { act, useDispatch, useMappedState } from 'store';

// -----

const useStyles = makeStyles({
  closeButton: {
    marginRight: 8,
  },

  drawer: {
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem',
    justifyItems: 'center',
  },

  drawerContent: {
    minWidth: '40vw',
    marginTop: '4rem',
  },

  fab: {
    position: 'fixed',
    bottom: '1rem',
    right: '1rem',
  },
});

// -----

const AddFab = props => (
  <Fab {...props}>
    <AddIcon />
  </Fab>
);

// -----

function DayDrawer(props) {
  const classes = useStyles();
  const clickEvent = useMappedState(
    useCallback(state => state.clickEvent, []),
  );
  const events = useDayEvents(clickEvent);
  const dispatch = useDispatch();

  const addFabOnClick = useCallback(
    () => dispatch(act.ADD_EVENT_FROM_DAY_DIALOG()),
    [],
  );
  const closeDrawerCallback = useCallback(
    () => dispatch(act.CLOSE_DAY_DIALOG()),
    [],
  );

  // -----

  const escListener = useCallback((event) => {
    if (event.keyCode === 27) dispatch(act.CLOSE_DAY_DIALOG());
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', escListener, false);
    return () => document.addEventListener('keydown', escListener, false);
  });

  // -----

  const heading = clickEvent ? clickEvent.start.toDateString() : 'Date!';

  const eventPanels = events.list.map((e, i) => (
    <EventDetailsPanel key={i} event={e} />
  ));

  return (
    <Drawer open={!!clickEvent}>
      <section className={classes.drawerContent}>
        <Typography component="h1" variant="h4">
          {heading}
        </Typography>
        <List>
          {eventPanels}
        </List>
      </section>

      <AddFab
        className={classes.fab}
        color="secondary"
        onClick={addFabOnClick}
      />
    </Drawer>
  );
}

export default DayDrawer;
