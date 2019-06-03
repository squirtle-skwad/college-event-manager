import { useCallback } from 'react';

import { createStore, applyMiddleware, compose } from 'redux';
import { useDispatch, useMappedState } from 'redux-react-hook';
import logger from 'redux-logger';
import actions from './actions';
import reducer from './reducer';

const appStore = createStore(
  reducer,
  compose(
    applyMiddleware(logger),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

function useGlobalState() {
  const map = useCallback(state => state, []);
  const gs = useMappedState(map);
  return gs;
}

export {
  appStore,
  useGlobalState,
  actions as act,
  reducer,
  useDispatch,
  useMappedState,
};
