import React,{createContext,useReducer,useContext} from "react";

export const Context = createContext()

export const StateProvider = ({reducer,initialState,children})=>{
     return(
          <Context.Provider value={useReducer(reducer,initialState)}>
               {children}
          </Context.Provider>
     )
}

export const useStateValue = ()=>useContext(Context)
