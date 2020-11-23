import React, { useEffect, useState } from "react";
import Head from "next/head";

import HeaderList from "../../components/utils/headerlist";
import Totalizator from "../../components/cards/totalizator";
import Auth from "../../helpers/Auth";

import api from "../../services/api";

function Dashboard() {
  const [totalRequests, setTotalRequests] = useState<number>(0);
  const [totalProcessos, setTotalProcessos] = useState<number>(0);
  const [totalUsuarios, setTotalUsuarios] = useState<number>(0);

  useEffect(() => {
    getTotalRequests();
    getTotalProcessos();
    getTotalUsuarios();
  }, []);

  async function getTotalRequests() {
    if (Auth.isAllow("administrador")) {
      await api.get("/api/totalizador/requisicoes").then((request) => {
        setTotalRequests(request.data.total);
      });
    }
  }

  async function getTotalProcessos() {
    await api.get("/api/totalizador/processos").then((request) => {
      setTotalProcessos(request.data.total);
    });
  }

  async function getTotalUsuarios() {
    await api.get("/api/totalizador/usuarios").then((request) => {
      setTotalUsuarios(request.data.total);
    });
  }

  return (
    <>
      <Head>
        <title>🥟 Dashboard</title>
      </Head>
      <main>
        <HeaderList title="Métricas"></HeaderList>
        <div className="container-fluid">
          <div className={`container`}>
            <div className="row">
              {totalRequests != 0 ? (
                <div className="col-12 col-md-4">
                  <Totalizator
                    title="Requests Auditadas"
                    number={totalRequests}
                  ></Totalizator>
                </div>
              ) : (
                ""
              )}
              {totalProcessos != 0 ? (
                <div className="col-12 col-md-4">
                  <Totalizator
                    title="Processos Registrados"
                    number={totalProcessos}
                  ></Totalizator>
                </div>
              ) : (
                ""
              )}
              {totalUsuarios != 0 ? (
                <div className="col-12 col-md-4">
                  <Totalizator
                    title="Total Usuários"
                    number={totalUsuarios}
                  ></Totalizator>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Dashboard;
