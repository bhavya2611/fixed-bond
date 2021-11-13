import React, { useState, createContext } from "react";
import Web3 from "web3";

//Context Object
export const Web3Context = createContext();

export const Web3ContextProvider = (props) => {
  const web3 = new Web3(window.ethereum);
  const [webInstance, setWebInstance] = useState(web3);

  return (
    <Web3Context.Provider value={[webInstance, setWebInstance]}>
      {props.children}
    </Web3Context.Provider>
  );
};
