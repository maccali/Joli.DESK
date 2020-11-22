import React, { useState, useEffect } from "react";
import Head from "next/head";
import { RiFilter2Line } from "react-icons/ri";
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

import PermitionsForm from "../../components/forms/permitions";

import api from "../../services/api";

function Permissoes() {
  const [permissoes, setPermissoes] = useState([]);
  const [costumes, setCostumes] = useState(null);

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
      .get("/api/sociedades")
      .then((request) => {
        console.log(request.data);
        setPermissoes(request.data);
      })
      .catch((error) => {
        setGetDataError(true);
        setGetDataErrorMessage(`Um erro ${error.request.status} Ocorreu`);
      });
  }

  async function getRegras() {
    await api.get("/api/costumes").then((request) => {
      console.log(request.data);
      setCostumes(request.data);
    });
  }

  function captalize(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function deletePermition(item: any) {
    console.log(item)
    api
      .delete(`/api/sociedades/${item.name}`)
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
        <title>🩲 Permissões</title>
      </Head>
      <main>
        <HeaderList title="Permissões">
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
            title="Adicionar Parmissão"
            action={() => {
              setModalInsert(true);
            }}
            iconOnly
          >
            <TiPlus />
          </Button>
        </HeaderList>
        {getDataError ? <Error message={getDataErrorMessage}></Error> : ""}
        {permissoes.map((permissao) => (
          <CardList
            key={`${permissao.name}`}
            title={`${captalize(permissao.name)}`}
          >

            <CardListNode
              col="col-xs-12"
              field="Descrição"
              value={permissao.description}
            />

            <CardListNode
              col="col-xs-12"
              field="Regras Aceitas"
              value={permissao.list}
            >
              {permissao.list.map((item) => (
                <CardListNode col="col-xs-4 col-sm-3" field="" value={item} />
              ))}
            </CardListNode>

            <CardListActions>
              <Button
                title={`Editar permissão ${permissao.title}`}
                action={() => {
                  setModalEdit(true);
                  setCurrent(permissao);
                }}
                iconOnly
                noStyle
              >
                <BtnIconCard>
                  <AiOutlineEdit />
                </BtnIconCard>
              </Button>
              <Button
                title={`Excluir permissão ${permissao.title}`}
                action={() => {
                  console.log("😎 Excluir Permissão");
                  deletePermition(permissao)
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
        {costumes ? <PermitionsForm costumes={costumes} type="INSERT" /> : ""}
      </Modal>
      <Modal
        open={modalEdit}
        setClose={() => {
          setModalEdit(!modalEdit);
          setCurrent(null);
        }}
      >
        {current ? (
          <PermitionsForm
            name={current.name}
            descricao={current.description}
            list={current.list}
            costumes={costumes}
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

export default Permissoes;
