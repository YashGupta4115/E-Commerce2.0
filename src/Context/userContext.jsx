import { createContext, useState } from "react";

export const UserContext = createContext({
  currentEmp: null,
  setCurrentEmp: () => null,
  currentUser: null,
  setCurrentUser: () => null,
  isAuthDropDownOpen: false,
  setIsAuthDropDownOpen: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentEmp, setCurrentEmp] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthDropDownOpen, setIsAuthDropDownOpen] = useState(false);

  const value = {
    currentEmp,
    setCurrentEmp,
    currentUser,
    setCurrentUser,
    isAuthDropDownOpen,
    setIsAuthDropDownOpen,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
