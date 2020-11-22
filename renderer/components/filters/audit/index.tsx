import React, { useState, useEffect } from "react";

import Input from "../../utils/input";
import Select from "../../utils/select";
import HeaderForm from "../../utils/headerform";
import Button from "../../utils/button";
import api from "../../../services/api";
import { RiContactsBookLine } from "react-icons/ri";

type AuditFilterFace = {
  status?: string;
  email?: string;
  setStatusFilter: (arg) => void;
  setEmailFilter: (arg) => void;
  requestFilter: () => void;
  setClose: () => void;
};

function AuditFilterForm(Aditions: AuditFilterFace) {
  const [status, setStatus] = useState<string>(Aditions.status);
  const [statusList, setStatusList] = useState<Array<string>>([
    "200",
    "401",
    "500",
  ]);
  const [email, setEmail] = useState<string>(Aditions.email);

  const [load, setLoad] = useState<boolean>(false);

  useEffect(() => {
    Aditions.setEmailFilter(email);
  }, [email]);

  useEffect(() => {
    Aditions.setStatusFilter(status);
  }, [status]);

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
              <HeaderForm title="Permições" />
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
              <Select
                name="Status"
                items={statusList}
                identify="status"
                onChange={(event) => {
                  setStatus(event.target.value);
                }}
              ></Select>
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

export default AuditFilterForm;
