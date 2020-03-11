import React, { useState, createContext, useReducer } from 'react';
import { initialState, transactionsReducer } from '../reducers'

export const Context = createContext();

export const Provider = ({ children }) => {

  const [state, dispatch] = useReducer(transactionsReducer, initialState);

  return (
    <Context.Provider
      value={{ state, dispatch }}
    >
      {children}
    </Context.Provider>
  )
}