import axios from "axios";
import { createContext, useContext, useState } from "react";

const StateContext = createContext();

const BASE_URL = "https://google-search3.p.rapidapi.com/api/v1";

export const ContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const getResults = async (type) => {
    setIsLoading(true);

    const { data } = await axios.get(`${BASE_URL}${type}`, {
      headers: {
        "x-rapidapi-host": process.env.REACT_APP_RAPIDAPI_HOST,
        "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_KEY,
      },
    });

    setResults(data);
    setIsLoading(false);

    console.log(data);
  };

  return (
    <StateContext.Provider
      value={{ results, searchQuery, setSearchQuery, isLoading, getResults }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
