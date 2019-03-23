import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { appStore } from "./store";
import { StoreContext } from "redux-react-hook";
import * as serviceWorker from "./serviceWorker";

import "./index.css";

ReactDOM.render(
    <StoreContext.Provider value={appStore}>
        <App />
    </StoreContext.Provider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
