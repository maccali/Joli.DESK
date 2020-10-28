import React, { useState } from "react";

import Input from "../../utils/input";
import Select from "../../utils/select";
import HeaderForm from "../../utils/headerform";

type PermitionsFace = {
  name?: string;
  kays?: Array<object>;
};

function PermitionsForm(Permitions: PermitionsFace) {
  const [kays, setKays] = useState<Array<object>>(Permitions.kays);
  const [name, setName] = useState<string>(Permitions.name);

  

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
          </div>
          <div className="row">
            <div className="col-xs col-md-12">

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PermitionsForm;
