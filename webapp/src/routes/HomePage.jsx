import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import _ from 'lodash';

import Calendar from 'components/Calendar';
import EventsDrawer from 'components/EventDrawer';
import { useMappedState } from 'store';

const useStyles = makeStyles({
  homeContainer: {
    height: '100vh',
    maxHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
});

function HomePage() {
  const classes = useStyles();
  const slotEvent = useMappedState(useCallback(state => state.slotEvent, []));

  if (!_.isEmpty(slotEvent)) {
    return <Redirect to="/event/new" />;
  }

  return (
    <main className={classes.homeContainer}>
      <Calendar />
      <EventsDrawer />
    </main>
  );
}

export default HomePage;
