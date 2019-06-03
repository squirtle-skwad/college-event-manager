import React from 'react';

import { CssBaseline } from '@material-ui/core';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';

import HomePage from 'routes/HomePage';
import LoginPage from 'routes/LoginPage';
import SignupPage from 'routes/SignupPage';

function AppContent() {
  return (
    <main className="App">
      <Route exact path="/" component={HomePage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/signup" component={SignupPage} />
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
