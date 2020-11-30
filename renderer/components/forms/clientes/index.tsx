import React, { useState, useEffect } from "react";

import Input from "../../utils/input";
import Select from "../../utils/select";
import HeaderForm from "../../utils/headerform";
import Button from "../../utils/button";
import api from "../../../services/api";

import IBGEHelper from "../../../helpers/IBGEHelper";

type selectFace = {
  unique: string;
  value: string;
};

type ClientesFace = {
  codigo?: string;
  nome?: string;
  email?: string;
  endereco?: string;
  telefone?: string;
  cep?: string;
  cidade?: string;
  uf?: string;
  tipo?: string;
  cpf?: string;
  rg?: string;
  nascimento?: string;
  cnpj?: string;
  natureza_jur?: string;
  cnae?: string;
  abertura?: string;
  // getCidade: (uf) => void;

  // ufList?: Array<any>;
  // cidadeList?: Array<any>;
  type: "INSERT" | "UPDATE";
};

function ClientesForm(Clientes: ClientesFace) {
  const [nome, setNome] = useState<string>(Clientes.nome);
  const [email, setEmail] = useState<string>(Clientes.email);
  const [endereco, setEndereco] = useState<string>(Clientes.endereco);
  const [telefone, setTelefone] = useState<string>(Clientes.telefone);
  const [cep, setCep] = useState<string>(Clientes.cep);
  const [cidade, setCidade] = useState<string>(Clientes.cidade);
  const [uf, setUf] = useState<string>(Clientes.uf);
  const [tipo, setTipo] = useState<string>(Clientes.tipo);
  const [cpf, setCpf] = useState<string>(Clientes.cpf);
  const [rg, setRg] = useState<string>(Clientes.rg);
  const [nascimento, setNascimento] = useState<string>(Clientes.nascimento);
  const [cnpj, setCnpj] = useState<string>(Clientes.cnpj);
  const [natureza_jur, setNatureza_jur] = useState<string>(
    Clientes.natureza_jur
  );
  const [cnae, setCnae] = useState<string>(Clientes.cnae);
  const [abertura, setAbertura] = useState<string>(Clientes.abertura);

  const [ufList, setUfList] = useState<Array<selectFace>>([]);
  const [cidadeList, setCidadeList] = useState<Array<selectFace>>([]);
  const [tipoList, setTipoList] = useState<Array<selectFace>>([
    { unique: "FISICA", value: "Fisica" },
    { unique: "JURIDICA", value: "Juridica" },
  ]);

  const [load, setLoad] = useState<boolean>(false);

  async function getCidades(uf) {
    setCidadeList(await IBGEHelper.getCidades(uf));
  }
  async function getUfs() {
    setUfList(await IBGEHelper.getEstados());
  }

  useEffect(() => {
    getCidades(uf);
  }, [uf]);

  useEffect(() => {
    getUfs();
  }, []);

  function sendRequest() {
    let data = {
      nome,
      email,
      endereco,
      telefone,
      cep,
      cidade,
      uf,
      tipo,
      cpf: cpf ? cpf : null,
      rg: rg ? rg : null,
      nascimento: nascimento ? nascimento : null,
      cnpj: cnpj ? cnpj : null,
      natureza_jur: natureza_jur ? natureza_jur : null,
      cnae: cnae ? cnae : null,
      abertura: abertura ? abertura : null,
    };

    console.log(data);

    setLoad(true);

    if (Clientes.type == "INSERT") {
      api
        .post("/api/pessoa", data)
        .then((request) => {
          setLoad(false);
          location.reload();
        })
        .catch((error) => {
          setLoad(false);
          console.log(error);
        });
    }

    if (Clientes.type == "UPDATE") {
      api
        .put(`/api/pessoa/${Clientes.codigo}`, data)
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
                value={nome}
                onChange={(event) => {
                  setNome(event.target.value);
                }}
              />
            </div>
            <div className="col-xs col-md-6">
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
            <div className="col-xs col-md-6">
              <Input
                title="Telefone"
                name="telefone"
                type="text"
                value={telefone}
                onChange={(event) => {
                  setTelefone(event.target.value);
                }}
              />
            </div>
            <div className="col-xs col-md-8">
              <Input
                title="Endereço"
                name="endereco"
                type="text"
                value={endereco}
                onChange={(event) => {
                  setEndereco(event.target.value);
                }}
              />
            </div>
            <div className="col-xs col-md-4">
              <Input
                title="CEP"
                name="cep"
                type="text"
                value={cep}
                onChange={(event) => {
                  setCep(event.target.value);
                }}
              />
            </div>
            <div className="col-xs col-md-4">
              {ufList ? (
                <Select
                  name="Unidade Federativa"
                  items={ufList}
                  identify="uf"
                  def={uf}
                  onChange={(event) => {
                    setUf(event.target.value);
                  }}
                ></Select>
              ) : (
                ""
              )}
            </div>
            <div className="col-xs col-md-4">
              {cidadeList ? (
                <Select
                  name="Cidade"
                  items={cidadeList}
                  identify="cidade"
                  def={cidade}
                  onChange={(event) => {
                    setCidade(event.target.value);
                  }}
                ></Select>
              ) : (
                ""
              )}
            </div>
            <div className="col-xs col-md-12">
              <Select
                name="Tipo"
                items={tipoList}
                identify="tipo"
                def={tipo}
                onChange={(event) => {
                  setTipo(event.target.value);
                }}
              ></Select>
            </div>
            {tipo === "FISICA" ? (
              <div>
                <div className="col-xs col-md-4">
                  <Input
                    title="CPF"
                    name="cpf"
                    type="text"
                    value={cpf}
                    onChange={(event) => {
                      setCpf(event.target.value);
                    }}
                  />
                </div>
                <div className="col-xs col-md-4">
                  <Input
                    title="RG"
                    name="rg"
                    type="text"
                    value={rg}
                    onChange={(event) => {
                      setRg(event.target.value);
                    }}
                  />
                </div>
              </div>
            ) : (
              ""
            )}
            {tipo === "JURIDICA" ? (
              <div>
                <div className="col-xs col-md-4">
                  <Input
                    title="CNPJ"
                    name="cnpj"
                    type="text"
                    value={cnpj}
                    onChange={(event) => {
                      setCnpj(event.target.value);
                    }}
                  />
                </div>
                <div className="col-xs col-md-4">
                  <Input
                    title="Natureza Jurídica"
                    name="natureza_jur"
                    type="text"
                    value={natureza_jur}
                    onChange={(event) => {
                      setNatureza_jur(event.target.value);
                    }}
                  />
                </div>
                <div className="col-xs col-md-4">
                  <Input
                    title="CNAE"
                    name="cnae"
                    type="text"
                    value={cnae}
                    onChange={(event) => {
                      setCnae(event.target.value);
                    }}
                  />
                </div>
              </div>
            ) : (
              ""
            )}
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

export default ClientesForm;
