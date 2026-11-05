import { useGetLocationQuery } from "@/redux/apis/locationApi";
import { createContext, useContext, useEffect, useState } from "react";

const LocationContext = createContext(null);

export const LocationProvider = ({ children }) => {
  const [isIndia, setIsIndia] = useState(false);
  const [flag, setFlag] = useState({
    name: "",
    image: null,
  });

  const { data } = useGetLocationQuery();

  useEffect(() => {
    if (data) {
      setIsIndia(data?.is_india || false);
      setFlag((prev) => ({
        ...prev,
        name: data?.country_name,
        image: data?.country_flag,
      }));
    }
  }, [data]);

  return (
    <LocationContext.Provider value={{ isIndia, flag }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);

  if (context === null) {
    throw new Error("useLocation must be used within a LocationProvider");
  }

  return context;
};
