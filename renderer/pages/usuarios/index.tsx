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

import UsersForm from "../../components/forms/users";

import api from "../../services/api";

function Usuarios() {
  const [permissoes, setPermissoes] = useState([]);
  const [sociedades, setSociedades] = useState(null);

  const [usuarios, setUsuarios] = useState([]);

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
    getRegras();
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

  async function getRegras() {
    await api.get("/api/sociedades").then((request) => {
      console.log(request.data);
      setSociedades(request.data);
    });
  }

  function deleteUser(userId: any) {
    api
      .delete(`/api/users/${userId}`)
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
                  setCurrent(usuario);
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
                  deleteUser(usuario.userId);
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
        {sociedades ? <UsersForm sociedades={sociedades} type="INSERT" /> : ""}
      </Modal>
      <Modal
        open={modalEdit}
        setClose={() => {
          setModalEdit(!modalEdit);
          setCurrent(null);
        }}
      >
        {current ? (
          <UsersForm
            userId={current.userId}
            name={current.name}
            email={current.email}
            password={current.password}
            sociedadesList={current.sociedade}
            sociedades={sociedades}
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

export default Usuarios;
