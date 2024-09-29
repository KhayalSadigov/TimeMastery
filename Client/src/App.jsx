import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/router";
import DataProvider from "./Context/dataContext";
import { useState } from "react";

function App() {
  return (
    <DataProvider >
      <RouterProvider router={router} />
    </DataProvider>
  );
}

export default App;
