import React, { useState, useEffect } from "react";

import Input from "../../utils/input";
import Select from "../../utils/select";
import HeaderForm from "../../utils/headerform";
import Button from "../../utils/button";
import api from "../../../services/api";
import { RiContactsBookLine } from "react-icons/ri";

type PermitionsFace = {
  name?: string;
  descricao?: string;
  list?: Array<string>;
  costumes?: Array<any>;
  type: "INSERT" | "UPDATE";
};

function PermitionsForm(Permitions: PermitionsFace) {
  const [list, setList] = useState<Array<any>>(Permitions.list);
  const [costumes, setCostumes] = useState<Array<any>>(Permitions.costumes);
  const [checkedList, setCheckedList] = useState<Array<string>>([]);
  const [name, setName] = useState<string>(Permitions.name);
  const [descricao, setDescricao] = useState<string>(Permitions.descricao);

  const [load, setLoad] = useState<boolean>(false);

  useEffect(() => {
    if (Permitions.type == "UPDATE") {
      setCheckedList(list);
    }
  }, []);

  function sendRequest() {
    let data = {
      name,
      description: descricao,
      list: checkedList,
    };

    setLoad(true);

    if (Permitions.type == "INSERT") {
      api
        .post("/api/sociedade", data)
        .then((request) => {
          setLoad(false);
          location.reload();
        })
        .catch((error) => {
          setLoad(false);
          console.log(error);
        });
    }

    if (Permitions.type == "UPDATE") {
      api
        .put(`/api/sociedade/${Permitions.name}`, data)
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
                title="Descrição"
                name="descricao"
                type="text"
                value={descricao}
                onChange={(event) => {
                  setDescricao(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="row">
            {costumes.map((item, index) => (
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

export default PermitionsForm;
