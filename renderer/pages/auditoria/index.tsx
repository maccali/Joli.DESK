import React, { useState, useEffect } from "react";
import Head from "next/head";
import { RiFilter2Line } from "react-icons/ri";
import { AiOutlineEye } from "react-icons/ai";

import HeaderList from "../../components/utils/headerlist";
import CardList from "../../components/cards/list";
import CardListNode from "../../components/cards/list/nodes";
import CardListActions from "../../components/cards/list/actions";
import Button from "../../components/utils/button";
import BtnIconCard from "../../components/cards/list/buttonicon";
import Modal from "../../components/utils/modal";
import Error from "../../components/utils/error/section";

import PermitionsForm from "../../components/forms/permitions";
import AuditFilterForm from "../../components/filters/audit";

import api from "../../services/api";

function Audit() {
  const [auditorias, setAuditorias] = useState([]);

  const [getDataError, setGetDataError] = useState(false);
  const [getDataErrorMessage, setGetDataErrorMessage] = useState(
    "Um erro Ocorreu"
  );

  const [statusFilter, setStatusFilter] = useState("200");
  const [emailFilter, setEmailFilter] = useState("");
  const [pageFilter, setPageFilter] = useState(1);

  const [modalViewer, setModalViewer] = useState(false);
  const [modalFilter, setModalFilter] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    console.log("Status", statusFilter);
    console.log("Eamil", emailFilter);
    await api
      .get("/api/auditoria", {
        params: {
          status: statusFilter,
          email: emailFilter,
          page: pageFilter,
        },
      })
      .then((request) => {
        console.log(request.data);
        setAuditorias(request.data);
      })
      .catch((error) => {
        setGetDataError(true);
        setGetDataErrorMessage(`Um erro ${error.request.status} Ocorreu`);
      });
  }

  return (
    <>
      <Head>
        <title>🕵️‍♀️ Auditoria</title>
      </Head>
      <main>
        <HeaderList title="Auditoria">
          <Button
            title="Filtro"
            action={() => {
              setModalFilter(true);
            }}
            iconOnly
          >
            <RiFilter2Line />
          </Button>
        </HeaderList>
        {getDataError ? <Error message={getDataErrorMessage}></Error> : ""}
        {auditorias.map((auditoria) => (
          <CardList
            key={`${auditoria.auditHistoryId}`}
            title={`Status - ${auditoria.status}`}
          >
            <CardListNode
              col="col-xs-6"
              field="Id"
              value={auditoria.auditHistoryId}
            />

            <CardListNode
              col="col-xs-6"
              field="Data"
              value={auditoria.time}
            ></CardListNode>

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

              {/* <Button
                title={`Excluir permissão ${permissao.title}`}
                action={() => {
                  console.log("😎 Excluir Permissão");
                  deletePermition(permissao);
                }}
                iconOnly
                noStyle
              >
                <BtnIconCard>
                  <AiOutlineClose />
                </BtnIconCard>
              </Button> */}
            </CardListActions>
          </CardList>
        ))}
      </main>

      <Modal open={modalViewer} setClose={() => setModalViewer(!modalViewer)}>
        VIEW
      </Modal>
      <Modal open={modalFilter} setClose={() => setModalFilter(!modalFilter)}>
        <AuditFilterForm
          email={emailFilter}
          status={statusFilter}
          setStatusFilter={setStatusFilter}
          setEmailFilter={setEmailFilter}
          requestFilter={getData}
          setClose={() => setModalFilter(!modalFilter)}
        ></AuditFilterForm>
      </Modal>
    </>
  );
}

export default Audit;
