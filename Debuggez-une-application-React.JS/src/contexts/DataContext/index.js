import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const DataContext = createContext({});

export const api = {
  loadData: async () => {
    try {
      const response = await fetch("/events.json");
      const json = await response.json();
      console.log("Données récupérées :", json); // Debugging line
      return json;
    } catch (error) {
      console.error("Erreur lors du chargement des données :", error); // Debugging line
      return { events: [], focus: [] };
    }
  },
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [lastEvent, setLastEvent] = useState(null);

  const getData = useCallback(async () => {
    try {
      const fetchedData = await api.loadData();
      setData(fetchedData);
      if (fetchedData.events && fetchedData.events.length > 0) {
        setLastEvent(fetchedData.events[fetchedData.events.length - 1]); // le dernier événement est le dernier élément du tableau
        console.log("Dernier événement défini :", fetchedData.events[fetchedData.events.length - 1]); // Debugging line
      }
    } catch (err) {
      console.error("Erreur lors de la récupération des données :", err); // Debugging line
      setError(err);
    }
  }, []);

  useEffect(() => {
    if (!data) {
      getData();
    }
  }, [data, getData]);

  return (
    <DataContext.Provider
      value={{
        data,
        lastEvent,
        error,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useData = () => useContext(DataContext);

export default DataContext;
