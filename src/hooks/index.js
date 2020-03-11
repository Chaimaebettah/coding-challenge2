import React, { useContext } from 'react';
import { Context as AppContext } from '../context/AppContext';

export const useActions = (actions) => {
  const { dispatch } = useContext(AppContext);

  const boundActions = {};

  Object.keys(actions).forEach((key) => {
    boundActions[key] = (...params) => {
      const action = actions[key](...params);
      if (typeof action === 'function') {
        action(dispatch);
      } else {
        dispatch(action);
      }
    }
  });

  return boundActions
}