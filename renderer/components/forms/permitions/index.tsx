import React, { useState, useEffect } from "react";

import Input from "../../utils/input";
import Select from "../../utils/select";
import HeaderForm from "../../utils/headerform";

type PermitionsFace = {
  name?: string;
  descricao?: string;
  list: Array<any>;
};

function PermitionsForm(Permitions: PermitionsFace) {
  const [list, setList] = useState<Array<any>>(Permitions.list);
  const [name, setName] = useState<string>(Permitions.name);
  const [descricao, setDescricao] = useState<string>(Permitions.descricao);

  // useEffect(() => {
  //   console.log('fdsfsddsf')
  //   console.log(Permitions.list)
  //   setList(Permitions.list)
    
  // }, []);

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
                title="Desacrição"
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
            wqerq
            {list.map((item) => (
              <div className="col-xs col-md-12">
                dsa
                <div>
                  <label for={item.name}>{item.name}</label>
                  <input type="checkbox" id={item.name} name={item.name} />
                </div>
                ;
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default PermitionsForm;
