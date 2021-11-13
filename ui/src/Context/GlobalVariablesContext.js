import React, { useState, createContext, useEffect, useContext } from "react";
import { getVariables } from "../Utils/utils";
import { Web3Context } from "./Web3Context";

//Context Object
export const GlobalVariablesContext = createContext();

export const GlobalVariablesContextProvider = (props) => {
  const [web3Instance] = useContext(Web3Context);
  const [globalVariables, setGlobalVariables] = useState({});

  const setDefaultVariables = async () => {
    const networkId = await web3Instance.eth.net.getId();
    setGlobalVariables(getVariables(networkId));
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
