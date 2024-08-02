import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./userContext";
import { getAuthDocuments, updateQueryItems } from "../Firebase/firebase";

export const queryContext = createContext();

export const QueryContextProvider = ({ children }) => {
  const [queries, setQueries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const fetchQueries = async () => {
      if (currentUser) {
        setIsLoading(true);
        const response = await getAuthDocuments(currentUser.uid);
        setQueries(response?.queries ?? []); // Default to an empty array if response.queries is null/undefined
        setIsLoading(false);
      }
    };
    fetchQueries();
  }, [currentUser]);

  useEffect(() => {
    if (currentUser && !isLoading) {
      updateQueryItems(currentUser.uid, queries);
    }
  }, [queries, currentUser, isLoading]);

  const addQueries = (queryItem) => {
    setQueries((prevQueries) => {
      if (!Array.isArray(prevQueries)) {
        prevQueries = []; // Ensure prevQueries is an array
      }
      return [...prevQueries, queryItem];
    });
  };

  const removeQueries = (queryItemId) => {
    setQueries((prevQueries) => {
      if (!Array.isArray(prevQueries)) {
        prevQueries = []; // Ensure prevQueries is an array
      }
      return prevQueries.filter((query) => query.id !== queryItemId);
    });
  };

  const value = {
    queries,
    setQueries,
    addQueries,
    removeQueries,
  };

  return (
    <queryContext.Provider value={value}>{children}</queryContext.Provider>
  );
};
