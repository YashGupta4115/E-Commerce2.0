import { createContext, useEffect, useState } from "react";
import { getCategoriesAndDocuments } from "../Firebase/firebase";

export const docContext = createContext();

export const DocContextProvider = ({ children }) => {
  const [clothData, setClothData] = useState(null);
  const [serviceDeskData, setServiceDeskData] = useState({});
  const [loading, setLoading] = useState(true);

  const value = {
    clothData,
    setClothData,
    serviceDeskData,
    setServiceDeskData,
    loading,
    setLoading,
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const clothResponse = await getCategoriesAndDocuments("clothData");
      const serviceDeskResponse = await getCategoriesAndDocuments(
        "serviceDeskData"
      );
      setClothData(clothResponse);
      setServiceDeskData(serviceDeskResponse);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <docContext.Provider value={value}>
      {loading ? <p>Loading...</p> : children}
    </docContext.Provider>
  );
};
