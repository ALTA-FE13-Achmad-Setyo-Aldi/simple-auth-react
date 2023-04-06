import React, { FC, FormEvent, useEffect, useState } from "react";
import Image from "../../assets/react.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import withReactContent from "sweetalert2-react-content";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";

import Layout from "../../components/Layout";
import { Input } from "../../components/Input";
import Button from "../../components/Button";
import { useTitle } from "../../utils/hooks";
import { handleAuth } from "../../utils/redux/reducers/reducer";
import Swal from "../../utils/swal";

interface ObjSubmitRegType {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  loading: boolean;
}

const Register: FC = () => {
  const [ObjSubmitReg, setObjSubmitReg] = useState<ObjSubmitRegType>({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    loading: false,
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const MySwal = withReactContent(Swal);
  const [, setCookie] = useCookies();
  const navigate = useNavigate();
  useTitle("Login | User Management");

  useEffect(() => {
    const isEmpty = Object.values(ObjSubmitReg).every((val) => {
      return val !== "";
    });
    setIsDisabled(!isEmpty);
  }, [ObjSubmitReg]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsDisabled(true);
    axios
      .post("register", ObjSubmitReg)
      .then((response) => {
        const { data, message } = response.data;
        MySwal.fire({
          title: "Success",
          text: message,
          showCancelButton: false,
        }).then((result) => {
          if (result.isConfirmed) {
            setCookie("tkn", data.token);
            setCookie("uname", data.username);
            navigate("/");
          }
        });
      })
      .catch((error) => {
        const { data } = error.response;
        MySwal.fire({
          title: "Failed",
          text: data.message,
          showCancelButton: false,
        });
      })
      .finally(() => setIsDisabled(false));
  }
  return (
    <Layout>
      <form
        className="flex flex-col items-center gap-4"
        onSubmit={(event) => handleSubmit(event)}
      >
        <div className="d-flex flex-col">
          <img src="/vite.svg" alt="Test 1" className="w-28 h-28" />
          <p className="text-center font-black">Register</p>
        </div>
        <Input
          placeholder="Username"
          id="input-uname"
          onChange={(event) =>
            setObjSubmitReg({ ...ObjSubmitReg, username: event.target.value })
          }
        />
        <Input
          placeholder="Password"
          id="input-password"
          onChange={(event) =>
            setObjSubmitReg({ ...ObjSubmitReg, password: event.target.value })
          }
        />
        <Input
          placeholder="First Name"
          id="input-fname"
          onChange={(event) =>
            setObjSubmitReg({ ...ObjSubmitReg, first_name: event.target.value })
          }
        />
        <Input
          placeholder="Last Name"
          id="input-lname"
          onChange={(event) =>
            setObjSubmitReg({ ...ObjSubmitReg, last_name: event.target.value })
          }
        />
        <Button
          label="Register"
          id="button-register"
          type="submit"
          disabled={isDisabled}
        />
      </form>
    </Layout>
  );
};
export default Register;
