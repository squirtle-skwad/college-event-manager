import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Calendar from 'components/Calendar';

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

  return (
    <main className={classes.homeContainer}>
      <Calendar />
    </main>
  );
}

export default HomePage;
