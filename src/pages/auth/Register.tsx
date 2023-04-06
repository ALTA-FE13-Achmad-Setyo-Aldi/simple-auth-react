import React, { Component, FormEvent } from "react";
import Image from "../../assets/react.svg";
import axios from "axios";

import Layout from "../../components/Layout";
import { Input } from "../../components/Input";
import Button from "../../components/Button";

interface PropsType {}
interface StateType {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  loading: boolean;
}

export class Register extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      username: "",
      password: "",
      first_name: "",
      last_name: "",
      loading: false,
    };
  }
  handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = {
      username: this.state.username,
      password: this.state.password,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      loading: false,
    };
    axios
      .post("register", body)
      .then((response) => {
        const { data } = response;
        console.log(data);
      })
      .catch((error) => {
        alert(error.toString());
      });
  }
  render() {
    return (
      <Layout>
        <form
          className="flex flex-col items-center gap-4"
          onSubmit={(event) => this.handleSubmit(event)}
        >
          <div className="d-flex flex-col">
            <img src="/vite.svg" alt="Test 1" className="w-28 h-28" />
            <p className="text-center font-black">Register</p>
          </div>
          <Input
            placeholder="Username"
            id="input-uname"
            onChange={(event) =>
              this.setState({ username: event.target.value })
            }
          />
          <Input
            placeholder="Password"
            id="input-password"
            onChange={(event) =>
              this.setState({ password: event.target.value })
            }
          />
          <Input
            placeholder="First Name"
            id="input-fname"
            onChange={(event) =>
              this.setState({ first_name: event.target.value })
            }
          />
          <Input
            placeholder="Last Name"
            id="input-lname"
            onChange={(event) =>
              this.setState({ last_name: event.target.value })
            }
          />
          <Button
            label="Register"
            id="button-register"
            type="submit"
            disabled={
              this.state.username === "" ||
              this.state.password === "" ||
              this.state.first_name === "" ||
              this.state.last_name === ""
            }
          />
        </form>
      </Layout>
    );
  }
}

export default Register;
