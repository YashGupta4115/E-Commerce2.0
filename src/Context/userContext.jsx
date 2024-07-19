import { createContext, useEffect, useState } from "react";
import {
  createEmpDocumentFromAuth,
  onEmpStateChangedListener,
} from "../Components/firebase/firbase.utils";

export const EmpContext = createContext({
  currentEmp: null,
  setCurrentEmp: () => null,
});

export const EmpProvider = ({ children }) => {
  const [currentEmp, setCurrentEmp] = useState(null);
  const value = { currentEmp, setCurrentEmp };

  useEffect(() => {
    const unsubscribe = onEmpStateChangedListener((emp) => {
      if (emp) {
        createEmpDocumentFromAuth(emp);
      }
      setCurrentEmp(emp);
    });
    return unsubscribe;
  });

  return <EmpContext.Provider value={value}>{children}</EmpContext.Provider>;
};
