import React, { useState, useEffect } from "react";

import Input from "../../utils/input";
import Select from "../../utils/select";
import HeaderForm from "../../utils/headerform";
import Button from "../../utils/button";
import File from "../../utils/file";
import api from "../../../services/api";

import IBGEHelper from "../../../helpers/IBGEHelper";

type ProcessosFace = {
  codigo?: string;
  cod_cliente?: string;
  cod_funcionario?: string;
  cod_processo?: string;
  numero?: string;
  documento?: string;
  documento_processual?: string;
  processo_tipo?: string;
  abertura?: string;
  type: "INSERT" | "UPDATE";
};

function ProcessosForm(Processos: ProcessosFace) {
  const [codCliente, setCodCliente] = useState<string>(Processos.cod_cliente);
  const [codProcesso, setCodProcesso] = useState<string>(
    Processos.cod_processo
  );
  const [numero, setNumero] = useState<string>(Processos.numero);
  const [processo, setProcesso] = useState<string>(Processos.processo_tipo);
  const [abertura, setAbertura] = useState<string>(Processos.abertura);
  const [documento, setDocumento] = useState<any>(
    process.env.API_URL + Processos.documento
  );
  const [documento_processual, setDocumentoProcessual] = useState<any>(
    process.env.API_URL + Processos.documento_processual
  );

  const [load, setLoad] = useState<boolean>(false);
  const [fileDocumentoName, setFileDocumentoName] = useState<string>("");
  const [
    fileDocumentoProcessoalName,
    setFileDocumentoProcessoalName,
  ] = useState<string>("");

  const [clientesList, setClientesList] = useState<Array<any>>([]);

  async function getClientes() {
    await api.get("/api/pessoas").then((request) => {
      console.log(request.data);

      let arrForSelect = [];

      request.data.forEach(function (item, chave) {
        arrForSelect.push({
          unique: item.codigo,
          value: item.nome,
        });
      });

      setClientesList(arrForSelect);
    });
  }

  useEffect(() => {
    getClientes();
  }, []);

  function sendRequest() {
    const formData = new FormData();

    formData.append("cod_cliente", codCliente);
    formData.append("numero", numero);
    formData.append("processo_tipo", processo);
    formData.append("abertura", abertura);
    formData.append("documento", documento);
    formData.append("documento_processual", documento_processual);
    console.log(abertura)

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    setLoad(true);

    if (Processos.type == "INSERT") {
      api
        .post("/api/processo", formData, config)
        .then((request) => {
          setLoad(false);
          location.reload();
        })
        .catch((error) => {
          setLoad(false);
          console.log(error);
        });
    }

    if (Processos.type == "UPDATE") {
      api
        .post(`/api/processo`, formData, config)
        .then((request) => {
          setLoad(false);
          location.reload();
        })
        .catch((error) => {
          setLoad(false);
          console.log(error);
        });
    }
  }

  return (
    <>
      <div className="container-fluid">
        <div className="container">
          <div className="row">
            <div className="col-xs col-md-12">
              <HeaderForm title="Processo" />
            </div>

            <div className="col-xs col-md-6">
              <File
                title="Documento"
                type="file"
                name="documento"
                value={documento}
                fileName={fileDocumentoName}
                onChange={(event) => {
                  setFileDocumentoName(event.target.files[0].name);
                  setDocumento(event.target.files[0]);
                }}
              />
            </div>
            <div className="col-xs col-md-6">
              <File
                title="Documento Processual"
                type="file"
                name="documento_processual"
                value={documento_processual}
                fileName={fileDocumentoProcessoalName}
                onChange={(event) => {
                  setFileDocumentoProcessoalName(event.target.files[0].name);
                  setDocumentoProcessual(event.target.files[0]);
                }}
              />
            </div>
            <div className="col-xs col-md-6">
              {clientesList ? (
                <Select
                  name="Cliente"
                  items={clientesList}
                  identify="cod_cliente"
                  def={codCliente}
                  onChange={(event) => {
                    console.log(event.target.value);
                    setCodCliente(event.target.value);
                  }}
                ></Select>
              ) : (
                ""
              )}
            </div>
            {/* {codProcesso ? ( */}
              <div className="col-xs col-md-6">
                <Input
                  title="Código Do Processo"
                  name="cod_processo"
                  type="text"
                  value={codProcesso}
                  onChange={(event) => {
                    setNumero(event.target.value);
                  }}
                  readonly
                />
              </div>
            {/* ) : (
              ""
            )} */}
            <div className="col-xs col-md-12">
              <Input
                title="Número"
                name="numero"
                type="text"
                value={numero}
                onChange={(event) => {
                  setNumero(event.target.value);
                }}
              />
            </div>
            <div className="col-xs col-md-6">
              <Input
                title="Tipo"
                name="processo_tipo"
                type="text"
                value={processo}
                onChange={(event) => {
                  setProcesso(event.target.value);
                }}
              />
            </div>
            <div className="col-xs col-md-6">
              <input
                id="date"
                type="date"
                value={abertura}
                onChange={(event) => {
                  setAbertura(event.target.value);
                }}
              />
     
            </div>
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

export default ProcessosForm;
