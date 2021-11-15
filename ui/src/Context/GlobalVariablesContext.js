import React, { useState, createContext, useEffect, useContext } from 'react';
import { getVariables } from '../Utils/utils';
import { Web3Context } from './Web3Context';

//Context Object
export const GlobalVariablesContext = createContext();

export const GlobalVariablesContextProvider = (props) => {
  const [globalVariables, setGlobalVariables] = useState({});

  const setDefaultVariables = async () => {
    setGlobalVariables(getVariables());
  };

  useEffect(() => {
    setDefaultVariables();
  }, []);

  return (
    <GlobalVariablesContext.Provider
      value={[globalVariables, setGlobalVariables]}
    >
      {props.children}
    </GlobalVariablesContext.Provider>
  );
};
