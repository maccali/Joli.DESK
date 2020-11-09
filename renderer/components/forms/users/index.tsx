import React, { useState, useEffect } from "react";

import Input from "../../utils/input";
import Select from "../../utils/select";
import HeaderForm from "../../utils/headerform";
import Button from "../../utils/button";
import api from "../../../services/api";
import { RiContactsBookLine } from "react-icons/ri";

type UsersFace = {
  userId?: string;
  name?: string;
  email?: string;
  password?: string;
  sociedadesList?: Array<string>;
  sociedades?: Array<any>;
  type: "INSERT" | "UPDATE";
};

function UsersForm(Users: UsersFace) {
  const [sociedadesList, setSociedadesList] = useState<Array<any>>(
    Users.sociedadesList
  );
  const [sociedades, setSociedades] = useState<Array<any>>(Users.sociedades);
  const [checkedList, setCheckedList] = useState<Array<string>>([]);
  const [name, setName] = useState<string>(Users.name);
  const [email, setEmail] = useState<string>(Users.email);
  const [password, setPassword] = useState<string>(Users.password);

  const [load, setLoad] = useState<boolean>(false);

  useEffect(() => {
    if (Users.type == "UPDATE") {
      setCheckedList(sociedadesList);
    }
  }, []);

  function sendRequest() {
    let data = {
      name,
      email,
      password,
      sociedade: checkedList,
    };

    setLoad(true);

    if (Users.type == "INSERT") {
      api
        .post("/api/user", data)
        .then((request) => {
          setLoad(false);
          location.reload();
        })
        .catch((error) => {
          setLoad(false);
          console.log(error);
        });
    }

    if (Users.type == "UPDATE") {
      api
        .put(`/api/user/${Users.userId}`, data)
        .then((request) => {
          setLoad(false);
          location.reload();
        })
        .catch((error) => {
          setLoad(false);
          console.log(error);
        });
    }

    console.log(data);
  }

  function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

  const handleCheckedList = (item: any) => {
    // updating an object instead of a Map
    // console.log(list);

    if (checkedList && checkedList.includes(item.name)) {
      removeItemOnce(checkedList, item.name);
    } else {
      setCheckedList([...checkedList, item.name]);
    }
    console.log(checkedList);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="container">
          <div className="row">
            <div className="col-xs col-md-12">
              <HeaderForm title="Permições" />
            </div>
            <div className="col-xs col-md-12">
              <Input
                title="Nome"
                name="nome"
                type="text"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
            </div>
            <div className="col-xs col-md-12">
              <Input
                title="Email"
                name="email"
                type="text"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </div>
            <div className="col-xs col-md-12">
              <Input
                title="Senha"
                name="password"
                type="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="row">
            {sociedades.map((item, index) => (
              <div key={item.name} className="col-xs-12 col-md-3">
                <input
                  type="checkbox"
                  id={item.name}
                  name={item.name}
                  onChange={() => handleCheckedList(item)}
                />
                <label for={item.name}>{item.name}</label>
              </div>
            ))}
          </div>
          <div className="row">
            <div className="col-xs-12">
              <Button
                title="Salvar"
                action={() => sendRequest()}
                textOnly
                load={load}
              >
                <span>Salvar</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UsersForm;
