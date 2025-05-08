import { useContext, createContext } from "react";
import type { ContextProp } from "../types/types";

export const UseContext = createContext<ContextProp | undefined>(undefined);

export const ContextProvider = UseContext.Provider;

export const useContextValue = () => {
  const context = useContext(UseContext);
  if (context == undefined) {
    throw new Error("useDashbord must be used within a CountProvider");
  }
  return context;
};
