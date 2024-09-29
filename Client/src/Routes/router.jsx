import { createBrowserRouter } from "react-router-dom";
import MainRout from "../Pages/MainRout";
import SignPage from "../Pages/SignPage";
import HomePage from "../Pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainRout />,
    children: [
      {
        path: "",
        element: <SignPage />,
      },
      {
        path :"home",
        element : <HomePage />
      }
    ],
  },
]);

export default router;
