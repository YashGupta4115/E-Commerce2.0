import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthDropDownOpen, setIsAuthDropDownOpen] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  const value = {
    currentUser,
    setCurrentUser,
    isAuthDropDownOpen,
    setIsAuthDropDownOpen,
    isAuthChecked,
  };
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsAuthChecked(true); // Mark that we have checked the auth state
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={value}>
      {isAuthChecked ? children : "Loading..."}
    </UserContext.Provider>
  );
};
