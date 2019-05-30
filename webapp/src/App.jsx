import React from 'react';

import { CssBaseline } from '@material-ui/core';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';

import HomePage from 'routes/HomePage';
import LoginPage from 'routes/LoginPage';

function AppContent() {
  return (
    <main className="App">
      <Route path="/" exact component={HomePage} />
      <Route path="/login" exact component={LoginPage} />
    </main>
  );
}

function App() {
  return (
    <Router>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <CssBaseline />
        <AppContent />
      </MuiPickersUtilsProvider>
    </Router>
  );
}
export default App;
