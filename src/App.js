import React from "react";
import "./App.css";

import { CssBaseline } from "@material-ui/core";
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import MomentUtils from "@date-io/moment";
import { MuiThemeProvider } from "@material-ui/core";
import theme from "./theme";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from "./components/Navigation";
import Calendar from "./components/Calendar";

function AppContent() {
    return (
        <div className='App'>
            <Navigation />
            <main className='App-content'>
                <Route path='/' exact component={Calendar} />
            </main>
        </div>
    );
}

function App() {
    return (
        <Router>
            <MuiThemeProvider theme={theme}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <CssBaseline />
                    <AppContent />
                </MuiPickersUtilsProvider>
            </MuiThemeProvider>
        </Router>
    );
}

export default App;
