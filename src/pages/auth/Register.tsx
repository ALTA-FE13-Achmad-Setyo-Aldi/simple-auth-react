import React, { Component } from "react";
import Image from "../../assets/react.svg";

import Layout from "../../components/Layout";
import { Input } from "../../components/Input";
import Button from "../../components/Button";

export class Register extends Component {
  render() {
    return (
      <Layout>
        <form className="flex flex-col items-center gap-4">
          <div className="d-flex flex-col">
            <img src="/vite.svg" alt="Test 1" className="w-28 h-28" />
            <p className="text-center font-black">Register</p>
          </div>
          <Input placeholder="Username" id="input-uname" />
          <Input placeholder="Password" id="input-password" />
          <Input placeholder="First Name" id="input-fname" />
          <Input placeholder="Last Name" id="input-lname" />
          <Button label="Register" id="button-register" />
        </form>
      </Layout>
    );
  }
}

export default Register;
