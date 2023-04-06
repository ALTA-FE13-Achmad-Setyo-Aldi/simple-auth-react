import { Component, FormEvent } from "react";
import Image from "../../assets/react.svg";
import axios from "axios";

import Layout from "../../components/Layout";
import { Input } from "../../components/Input";
import Button from "../../components/Button";

interface PropsType {}
interface StateType {
  username: string;
  password: string;
  loading: boolean;
}

class Login extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loading: false,
    };
  }
  handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = {
      username: this.state.username,
      password: this.state.password,
    };
    axios
      .post("login", body)
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
          className="flex flex-col items-center gap-4 w-[40%]"
          // onSubmit={this.handleSubmit}
          onSubmit={(event) => this.handleSubmit(event)}
        >
          <div className="flex">
            <img src="/vite.svg" alt="Test 1" className="w-28 h-28" />
            <img src={Image} alt="Test 2" className="w-28 h-28" />
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
            type="password"
            onChange={(event) =>
              this.setState({ password: event.target.value })
            }
          />
          <Button
            label="Login"
            id="button-login"
            type="submit"
            disabled={this.state.username === "" || this.state.password === ""}
          />
        </form>
      </Layout>
    );
  }
}

export default Login;
