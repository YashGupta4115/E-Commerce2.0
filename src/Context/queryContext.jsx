import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./userContext";
import { getAuthDocuments, updateQueryItems } from "../Firebase/firebase";

export const queryContext = createContext();

export const QueryContextProvoder = ({ children }) => {
  const [queries, setQueries] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const fetchQueries = async () => {
      if (currentUser) {
        setIsLoading(true);
        const response = await getAuthDocuments(currentUser.uid);
        setQueries(response.queries);
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
    setQueries([...queries, queryItem]);
  };

  const removeQueries = (queryItemId) => {
    setQueries(queries.filter((query) => query.id !== queryItemId));
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
