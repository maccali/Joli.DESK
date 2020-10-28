import React, { useState, useEffect } from "react";
import Head from "next/head";
import { RiFilter2Line } from "react-icons/ri";
import { TiPlus } from "react-icons/ti";
import { AiOutlineEye, AiOutlineEdit, AiOutlineClose } from "react-icons/ai";

import HeaderList from "../../components/utils/headerlist";
import CardList from "../../components/cards/list";
import CardListNode from "../../components/cards/list/nodes";
import CardListActions from "../../components/cards/list/actions";
import Button from "../../components/utils/button";
import BtnIconCard from "../../components/cards/list/buttonicon";
import Modal from "../../components/utils/modal";
import Error from "../../components/utils/error/section";

import api from "../../services/api";
import { request } from "http";

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);

  const [getDataError, setGetDataError] = useState(false);
  const [getDataErrorMessage, setGetDataErrorMessage] = useState(
    "Um erro Ocorreu"
  );

  const [modalEdit, setModalEdit] = useState(false);
  const [modalInsert, setModalInsert] = useState(false);
  const [modalViewer, setModalViewer] = useState(false);
  const [modalFilter, setModalFilter] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    await api
      .get("/api/users")
      .then((request) => {
        setUsuarios(request.data);
      })
      .catch((error) => {
        setGetDataError(true);
        setGetDataErrorMessage(`Um erro ${error.request.status} Ocorreu`);
      });
  }

  return (
    <>
      <Head>
        <title>Usuarios</title>
      </Head>
      <main>
        <HeaderList title="Usuarios">
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
            title="Adicionar usuario"
            action={() => {
              setModalInsert(true);
            }}
            iconOnly
          >
            <TiPlus />
          </Button>
        </HeaderList>
        {getDataError ? <Error message={getDataErrorMessage}></Error> : ""}
        {usuarios.map((usuario) => (
          <CardList key={`${usuario.email}`} title={`${usuario.name}`}>
            <CardListNode
              col="col-xs-12 col-md-4"
              field="Utilidade"
              value={`${usuario.sociedade}`}
            />
            <CardListActions>
              <Button
                title="Visualizar item"
                action={() => {
                  setModalViewer(true);
                }}
                iconOnly
                noStyle
              >
                <BtnIconCard>
                  <AiOutlineEye />
                </BtnIconCard>
              </Button>
              <Button
                title="Editar cliente"
                action={() => {
                  setModalEdit(true);
                }}
                iconOnly
                noStyle
              >
                <BtnIconCard>
                  <AiOutlineEdit />
                </BtnIconCard>
              </Button>
              <Button
                title="Excluir cliente"
                action={() => {
                  console.log("😎 Excluir cliente");
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
        INSERT
      </Modal>
      <Modal open={modalEdit} setClose={() => setModalEdit(!modalEdit)}>
        EDIT
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

export default Usuarios;
