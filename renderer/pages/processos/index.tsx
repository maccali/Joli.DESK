import React, { useState, useEffect } from "react";
import Head from "next/head";
import { RiFilter2Line } from "react-icons/ri";
import { TiPlus } from "react-icons/ti";
import { AiOutlineEdit, AiOutlineClose } from "react-icons/ai";

import HeaderList from "../../components/utils/headerlist";
import CardList from "../../components/cards/list";
import CardListNode from "../../components/cards/list/nodes";
import CardLinkNode from "../../components/cards/linkNode";
import CardVersionNode from "../../components/cards/versionNode";
import CardListActions from "../../components/cards/list/actions";
import Button from "../../components/utils/button";
import BtnIconCard from "../../components/cards/list/buttonicon";
import Modal from "../../components/utils/modal";
import Error from "../../components/utils/error/section";
import DateHelper from "../../helpers/DateHelper";

import ProcessosForm from "../../components/forms/processos";
import ProcessoFilterForm from "../../components/filters/processos";

import api from "../../services/api";

function Processo() {
  const [processos, setProcessos] = useState([]);
  // const [costumes, setCostumes] = useState(null);

  const [getDataError, setGetDataError] = useState(false);
  const [getDataErrorMessage, setGetDataErrorMessage] = useState(
    "Um erro Ocorreu"
  );

  const [current, setCurrent] = useState(null);

  const [processoFilter, setProcessoFilter] = useState("");

  const [modalEdit, setModalEdit] = useState(false);
  const [modalInsert, setModalInsert] = useState(false);
  const [modalViewer, setModalViewer] = useState(false);
  const [modalFilter, setModalFilter] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  async function getDataFiltered() {
    console.log(processoFilter);

    await api
      .get(`/api/processos/history/${processoFilter}`)
      .then((request) => {
        console.log(request.data);
        setProcessos(request.data);
      })
      .catch((error) => {
        setGetDataError(true);
        setGetDataErrorMessage(`Um erro ${error.request.status} Ocorreu`);
      });
  }

  async function getData() {
    await api
      .get("/api/processos")
      .then((request) => {
        console.log(request.data);
        setProcessos(request.data);
      })
      .catch((error) => {
        setGetDataError(true);
        setGetDataErrorMessage(`Um erro ${error.request.status} Ocorreu`);
      });
  }

  function deletePermition(item: any) {
    console.log(item);
    api
      .delete(`/api/processos/${item.codigo}`)
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
        <title>💌 Processos</title>
      </Head>
      <main>
        <HeaderList title="Processos">
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
            title="Adicionar Processo"
            action={() => {
              setModalInsert(true);
            }}
            iconOnly
          >
            <TiPlus />
          </Button>
        </HeaderList>
        {getDataError ? <Error message={getDataErrorMessage}></Error> : ""}
        {processos.map((processo) => (
          <CardList
            key={`${processo.cod_processo}`}
            title={`${processo.cod_processo}`}
          >
            <CardListNode
              col="col-xs-4"
              field="Número"
              value={processo.numero}
            />

            <CardListNode
              col="col-xs-4"
              field="Tipo"
              value={processo.processo_tipo}
            />

            <CardListNode
              col="col-xs-4"
              field="Abertura"
              value={DateHelper.getDateTimeFormat(processo.abertura)}
            />

            <CardListNode
              col="col-xs-4"
              field="Documento"
              value={processo.documento}
              children={<CardLinkNode link={processo.documento} />}
            />

            <CardListNode
              col="col-xs-4"
              field="Documento Processoal"
              value={processo.documento_processual}
              children={<CardLinkNode link={processo.documento_processual} />}
            />

            <CardListNode
              col="col-xs-4"
              field="Versão Data"
              value={processo.created_at}
              children={
                <CardVersionNode
                  versao={processo.created_at}
                  excluida={processo.deleted_at}
                />
              }
            />

            <CardListActions>
              <Button
                title={`Editar processo ${processo.cod_processo}`}
                action={() => {
                  setModalEdit(true);
                  setCurrent(processo);
                }}
                iconOnly
                noStyle
              >
                <BtnIconCard>
                  <AiOutlineEdit />
                </BtnIconCard>
              </Button>
              <Button
                title={`Excluir processo ${processo.cod_processo}`}
                action={() => {
                  console.log("😎 Excluir Cliente");
                  deletePermition(processo);
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
        <ProcessosForm type="INSERT" />
      </Modal>
      <Modal
        open={modalEdit}
        setClose={() => {
          setModalEdit(!modalEdit);
          setCurrent(null);
        }}
      >
        {current ? (
          <ProcessosForm
            codigo={current.codigo}
            numero={current.numero}
            processo_tipo={current.processo_tipo}
            cod_cliente={current.cod_cliente}
            cod_funcionario={current.cod_funcionario}
            cod_processo={current.cod_processo}
            documento={current.documento}
            documento_processual={current.documento_processual}
            abertura={current.abertura}
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
        <ProcessoFilterForm
          codProcesso={processoFilter}
          setCodProcessoFilter={setProcessoFilter}
          requestFilter={getDataFiltered}
          setClose={() => setModalFilter(!modalFilter)}
        ></ProcessoFilterForm>
      </Modal>
    </>
  );
}

export default Processo;
