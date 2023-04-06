import { FC, FormEvent, useEffect, useState } from "react";
import Image from "../../assets/react.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Layout from "../../components/Layout";
import { Input } from "../../components/Input";
import Button from "../../components/Button";
import { useTitle } from "../../utils/hooks";

interface ObjSubmitType {
  username: string;
  password: string;
}

const Login: FC = () => {
  const [objSubmit, setObjSubmit] = useState<ObjSubmitType>({
    username: "",
    password: "",
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const navigate = useNavigate();
  useTitle("Login | User Management");

  useEffect(() => {
    const isEmpty = Object.values(objSubmit).every((val) => val === "");
  }, [objSubmit]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsDisabled(true);
    axios
      .post("login", objSubmit)
      .then((response) => {
        const { data } = response;
        alert(data.message);
        navigate("/");
      })
      .catch((error) => {
        alert(error.toString());
      })
      .finally(() => setIsDisabled(false));
  }

  return (
    <Layout>
      <form
        className="flex flex-col items-center gap-4 w-[40%]"
        onSubmit={(event) => handleSubmit(event)}
      >
        <div className="flex">
          <img src="/vite.svg" alt="Test 1" className="w-28 h-28" />
          <img src={Image} alt="Test 2" className="w-28 h-28" />
        </div>
        <Input
          placeholder="Username"
          id="input-uname"
          onChange={(event) =>
            setObjSubmit({ ...objSubmit, username: event.target.value })
          }
        />
        <Input
          placeholder="Password"
          id="input-password"
          type="password"
          onChange={(event) =>
            setObjSubmit({ ...objSubmit, password: event.target.value })
          }
        />
        <p className="text-white">
          Already have and account? Login{" "}
          <Link className="font-bold" to="/register" id="nav-register">
            here!
          </Link>
        </p>
        <Button
          label="Login"
          id="button-login"
          type="submit"
          disabled={isDisabled}
        />
      </form>
    </Layout>
  );
};

export default Login;
