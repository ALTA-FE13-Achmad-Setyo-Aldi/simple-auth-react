/*ini file untuk route*/
import React, { Component } from "react";
import axios from "axios";

import Home from "../pages";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Profile from "../pages/Profile";

axios.defaults.baseURL =
  "https://virtserver.swaggerhub.com/devanada/hells-kitchen/1.1.0";

class Router extends Component {
  render() {
    return <Home />;
  }
}

export default Router;
