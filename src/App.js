import React from "react";
import "./App.css";

import { CssBaseline } from "@material-ui/core";
import { MuiThemeProvider } from '@material-ui/core';
import theme from "./theme";

import Navigation from "./components/Navigation";

function AppContent() {
	return(
		<div className="App">
      		<Navigation />
      		<main className="App-content">
						Hello World
					</main>
    	</div>
	);
}

function App() {
  return (
	<React.Fragment>
		<MuiThemeProvider theme={theme}>
			<CssBaseline />
			<AppContent />
		</MuiThemeProvider>
	</React.Fragment>
  );
}

export default App;
