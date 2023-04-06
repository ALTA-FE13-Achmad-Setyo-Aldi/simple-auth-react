import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { FC, useState, useMemo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import axios from "axios";

import Register from "../pages/auth/Register";
import NotFound from "../pages/NotFound";
import Login from "../pages/auth/Login";
import Profile from "../pages/Profile";
import Home from "../pages";

import { handleAuth } from "../utils/redux/reducers/reducer";
import { ThemeContext } from "../utils/context";

axios.defaults.baseURL = "https://hells-kitchen.onrender.com/api/v1";

const Router: FC = () => {
  const [theme, setTheme] = useState<string>("light");
  const background = useMemo(() => ({ theme, setTheme }), [theme]);
  // const token = localStorage.getItem("tkn")
  const [cookie] = useCookies(["tkn", "uname"]);
  // useDispatch untuk merubah nilai dari suatu state
  const dispatch = useDispatch();
  const getToken = cookie.tkn;

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <NotFound />,
    },
    {
      path: "/login",
      // Navigate digunakan untuk redirect
      element: getToken ? <Navigate to="/" /> : <Login />,
    },
    {
      path: "/register",
      // Navigate digunakan untuk redirect
      element: getToken ? <Navigate to="/" /> : <Register />,
    },
    {
      path: "/profile/:username", // <~ path param
      element: <Profile />,
    },
  ]);

  useEffect(() => {
    if (getToken) {
      dispatch(
        handleAuth({ isLoggedIn: true, uname: cookie.uname, token: getToken })
      );
    } else {
      dispatch(handleAuth({ isLoggedIn: false, uname: "", token: "" }));
    }
  }, [cookie]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={background}>
      <RouterProvider router={router} />
    </ThemeContext.Provider>
  );
};

export default Router;
