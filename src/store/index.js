import reducer from "./reducer";
import actions from "./actions";

import { useCallback } from "react";
import { createStore } from "redux";
import { useDispatch, useMappedState } from "redux-react-hook";

const appStore = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function useGlobalState() {
    const map = useCallback((state) => state, []);
    const gs = useMappedState(map);
    return gs;
}

export { appStore, useGlobalState, actions as act, reducer, useDispatch, useMappedState };
