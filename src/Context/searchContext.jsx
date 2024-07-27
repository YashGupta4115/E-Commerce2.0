import { createContext, useState } from "react";

export const searchContext = createContext();

export const SearchContextProvider = ({ children }) => {
  const [searchText, setSearchText] = useState("");

  const value = {
    searchText,
    setSearchText,
  };

  return (
    <searchContext.Provider value={value}>{children}</searchContext.Provider>
  );
};
