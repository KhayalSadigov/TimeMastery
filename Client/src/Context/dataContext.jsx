import axios from "axios";
import { createContext, useEffect, useState } from "react";
export const DataContext = createContext("");
export const baseUrl = "http://localhost:2121/api/";
import PropTypes from "prop-types";

function DataProvider({ children }) {
  if (!JSON.parse(localStorage.getItem("TMuser"))) {
    localStorage.setItem("TMuser", JSON.stringify(null));
  }
  const [users, setUsers] = useState([]);
  const [client, setClient] = useState(
    JSON.parse(localStorage.getItem("TMuser"))
  );
  useEffect(() => {
    if (client)
      axios.get(baseUrl + "users").then((res) => {
        setUsers(res.data);
      });
  }, []);

  let store = {
    client: {
      data: client,
      set: setClient,
    },
    users: {
      data: users,
      set: setUsers,
    },
  };
  return (
    <>
      <DataContext.Provider value={store}>{children}</DataContext.Provider>
    </>
  );
}

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DataProvider;
