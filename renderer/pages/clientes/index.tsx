import React, { useState, useEffect } from "react";
import Head from "next/head";
import { RiContactsLine, RiFilter2Line } from "react-icons/ri";
import { TiPlus } from "react-icons/ti";
import { AiOutlineEdit, AiOutlineClose } from "react-icons/ai";

import HeaderList from "../../components/utils/headerlist";
import CardList from "../../components/cards/list";
import CardListNode from "../../components/cards/list/nodes";
import CardListActions from "../../components/cards/list/actions";
import Button from "../../components/utils/button";
import BtnIconCard from "../../components/cards/list/buttonicon";
import Modal from "../../components/utils/modal";
import Error from "../../components/utils/error/section";

import ClientesForm from "../../components/forms/clientes";

import api from "../../services/api";

function Clientes() {
  const [clientes, setClientes] = useState([]);
  // const [costumes, setCostumes] = useState(null);
  const [ufList, setUfList] = useState(null);
  const [cidadeList, setCidadeList] = useState(null);

  const [getDataError, setGetDataError] = useState(false);
  const [getDataErrorMessage, setGetDataErrorMessage] = useState(
    "Um erro Ocorreu"
  );

  const [current, setCurrent] = useState(null);

  const [modalEdit, setModalEdit] = useState(false);
  const [modalInsert, setModalInsert] = useState(false);
  const [modalViewer, setModalViewer] = useState(false);
  const [modalFilter, setModalFilter] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    await api
      .get("/api/pessoas")
      .then((request) => {
        console.log(request.data);
        setClientes(request.data);
      })
      .catch((error) => {
        setGetDataError(true);
        setGetDataErrorMessage(`Um erro ${error.request.status} Ocorreu`);
      });
  }

  function deletePermition(item: any) {
    console.log(item);
    api
      .delete(`/api/pessoa/${item.codigo}`)
      .then((request) => {
        // console.log(request.data);
        location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <Head>
        <title>🧍‍♂️🧍‍♀️ Clientes</title>
      </Head>
      <main>
        <HeaderList title="Clientes">
          <Button
            title="Filtro"
            action={() => {
              setModalFilter(true);
            }}
            iconOnly
          >
            <RiFilter2Line />
          </Button>
          <Button
            title="Adicionar Cliente"
            action={() => {
              setModalInsert(true);
            }}
            iconOnly
          >
            <TiPlus />
          </Button>
        </HeaderList>
        {getDataError ? <Error message={getDataErrorMessage}></Error> : ""}
        {clientes.map((cliente) => (
          <CardList key={`${cliente.nome}`} title={`${cliente.nome}`}>
            <CardListNode col="col-xs-6" field="Email" value={cliente.email} />

            <CardListNode
              col="col-xs-6"
              field="Telefone"
              value={cliente.telefone}
            />

            <CardListNode col="col-xs-4" field="CEP" value={cliente.cep} />

            <CardListNode
              col="col-xs-4"
              field="Cidade"
              value={cliente.cidade}
            />

            <CardListNode
              col="col-xs-4"
              field="União Federativa"
              value={cliente.uf}
            />

            <CardListActions>
              <Button
                title={`Editar cliente ${cliente.nome}`}
                action={() => {
                  setModalEdit(true);
                  setCurrent(cliente);
                }}
                iconOnly
                noStyle
              >
                <BtnIconCard>
                  <AiOutlineEdit />
                </BtnIconCard>
              </Button>
              <Button
                title={`Excluir permissão ${cliente.nome}`}
                action={() => {
                  console.log("😎 Excluir Cliente");
                  deletePermition(cliente);
                }}
                iconOnly
                noStyle
              >
                <BtnIconCard>
                  <AiOutlineClose />
                </BtnIconCard>
              </Button>
            </CardListActions>
          </CardList>
        ))}
      </main>

      <Modal open={modalInsert} setClose={() => setModalInsert(!modalInsert)}>
        <ClientesForm uf="RS" cidade="Lajeado" type="INSERT" />
      </Modal>
      <Modal
        open={modalEdit}
        setClose={() => {
          setModalEdit(!modalEdit);
          setCurrent(null);
        }}
      >
        {current ? (
          <ClientesForm
            abertura={current.abertura}
            cep={current.cep}
            cidade={current.cidade}
            cnae={current.cnae}
            cnpj={current.cnpj}
            codigo={current.codigo}
            cpf={current.cpf}
            email={current.email}
            endereco={current.endereco}
            nascimento={current.nascimento}
            natureza_jur={current.natureza_jur}
            nome={current.nome}
            rg={current.rg}
            telefone={current.telefone}
            tipo={current.tipo}
            uf={current.uf}
            type="UPDATE"
          />
        ) : (
          ""
        )}
      </Modal>
      <Modal open={modalViewer} setClose={() => setModalViewer(!modalViewer)}>
        VIEW
      </Modal>
      <Modal open={modalFilter} setClose={() => setModalFilter(!modalFilter)}>
        Filter
      </Modal>
    </>
  );
}

export default Clientes;
