import React from 'react';
import PropTypes from 'prop-types';

import { Fab } from '@material-ui/core';
import { TableChart as ReportIcon } from '@material-ui/icons';

import { BASE_URL as ENDPOINT } from 'util/client';

const MonthlyReportFab = (props) => {
  const { date } = props;
  const month = date.getMonth() + 1;
  const year = date.getYear() + 1900;

  return (
    <Fab
      {...props}
      color="primary"
      style={{
        position: 'absolute',
        bottom: '1rem',
        left: 'auto',
        right: '1rem',
      }}
      component="a"
      href={`${ENDPOINT}/month-report/${month}/${year}`}
    >
      <ReportIcon />
    </Fab>
  );
};

MonthlyReportFab.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
};

export default MonthlyReportFab;
