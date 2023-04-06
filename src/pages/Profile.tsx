import { FC, FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Layout from "../components/Layout";
import { useTitle } from "../utils/hooks";
import { UserEdit } from "../utils/types/user";
import Button from "../components/Button";
import { Input } from "../components/Input";

const Profile: FC = () => {
  const [objSubmit, setObjSubmit] = useState<Partial<UserEdit>>({});
  const [data, setData] = useState<Partial<UserEdit>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const params = useParams();
  useTitle("Profile | User Management");

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    const { username: uname } = params;
    axios
      .get(`users/${uname}`)
      .then((response) => {
        const { data } = response.data;
        document.title = `${data.username} | User Management`;
        setData(data);
      })
      .catch((error) => {
        alert(error.toString());
      })
      .finally(() => setLoading(false));
  }

  function handleChange(value: string | File, key: keyof typeof objSubmit) {
    let temp = { ...objSubmit };
    temp[key] = value;
    setObjSubmit(temp);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData();
    let key: keyof typeof objSubmit;
    for (key in objSubmit) {
      formData.append(key, objSubmit[key]);
    }
    axios
      .put("users", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        const { data } = response;
        setIsEdit(false);
      })
      .catch((error) => {
        alert(error.toString());
      })
      .finally(() => fetchData());
  }

  const handleEditMode = () => {
    setIsEdit(!isEdit);
  };

  return (
    <Layout>
      <div className="flex flex-col items-center">
        <img
          src={data.image}
          alt={`${data.username}'s profile picture`}
          className="w-44 h-44 rounded-full"
        />
        {isEdit ? (
          <form onSubmit={(event) => handleSubmit(event)}>
            <Input
              placeholder="Select Image"
              type="file"
              onChange={(event) => {
                if (!event.currentTarget.files) {
                  return;
                }
                setData({
                  ...data,
                  image: URL.createObjectURL(event.currentTarget.files[0]),
                });
                handleChange(event.currentTarget.files[0], "image");
              }}
            />
            <Input
              placeholder="First Name"
              defaultValue={data.first_name}
              onChange={(event) =>
                handleChange(event.target.value, "first_name")
              }
            />
            <Input
              placeholder="Last Name"
              defaultValue={data.last_name}
              onChange={(event) =>
                handleChange(event.target.value, "last_name")
              }
            />
            <Input
              placeholder="Username"
              defaultValue={data.username}
              onChange={(event) => handleChange(event.target.value, "username")}
            />
            <Input
              placeholder="Password"
              defaultValue={data.password}
              onChange={(event) => handleChange(event.target.value, "password")}
            />
            <Button label="Submit" id="button-submit" type="submit" />
          </form>
        ) : (
          <div>
            <p>
              {data.first_name} {data.last_name}
            </p>
            <p>{data.username}</p>
          </div>
        )}
      </div>

      <Button label="Edit Profile" id="button-edit" onClick={handleEditMode} />
    </Layout>
  );
};

export default Profile;
