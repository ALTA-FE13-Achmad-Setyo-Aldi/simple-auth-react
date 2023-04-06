/*ini file untuk route*/
import { FC } from "react";
import axios from "axios";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "../pages";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";

axios.defaults.baseURL =
  "https://virtserver.swaggerhub.com/devanada/hells-kitchen/1.1.0";

const Router: FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <NotFound />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/profile/:username",
      element: <Profile />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Router;
