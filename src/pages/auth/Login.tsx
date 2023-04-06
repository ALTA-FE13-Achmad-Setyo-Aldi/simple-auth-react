import { Component } from "react";
import Image from "../../assets/react.svg";

import Layout from "../../components/Layout";
import { Input } from "../../components/Input";
import Button from "../../components/Button";

class Login extends Component {
  render() {
    return (
      <Layout>
        <form className="flex flex-col items-center gap-4">
          <div className="flex">
            <img src="/vite.svg" alt="Test 1" className="w-28 h-28" />
            <img src={Image} alt="Test 2" className="w-28 h-28" />
          </div>
          <Input placeholder="Username" id="input-uname" />
          <Input placeholder="Password" id="input-password" type="password" />
          <Button label="Login" id="button-login" />
        </form>
      </Layout>
    );
  }
}
export default Login;
