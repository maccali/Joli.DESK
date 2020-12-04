import React, { useState } from "react";

import Input from "../../utils/input";
import HeaderForm from "../../utils/headerform";
import Button from "../../utils/button";

type ProcessoFilterFace = {
  codProcesso?: string;
  setCodProcessoFilter: (arg) => void;
  requestFilter: () => void;
  setClose: () => void;
};

function ProcessoFilterForm(Aditions: ProcessoFilterFace) {
  const [load, setLoad] = useState<boolean>(false);

  function sendRequestFilter() {
    Aditions.requestFilter();
    Aditions.setClose();
  }

  return (
    <>
      <div className="container-fluid">
        <div className="container">
          <div className="row">
            <div className="col-xs col-md-12">
              <HeaderForm title="Processos" />
            </div>
            <div className="col-xs col-md-12">
              <Input
                title="Código Processo"
                name="cod_processo"
                type="text"
                value={Aditions.codProcesso}
                onChange={(event) => {
                  Aditions.setCodProcessoFilter(event.target.value);
                }}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12">
              <Button
                title="Salvar"
                action={() => sendRequestFilter()}
                textOnly
                load={load}
              >
                <span>Filtrar</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProcessoFilterForm;
