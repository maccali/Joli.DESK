import React, { useEffect, useState } from "react";
import Head from "next/head";

import HeaderList from "../../components/utils/headerlist";
import Totalizator from "../../components/cards/totalizator";

import api from "../../services/api";

function Dashboard() {
  const [totalRequests, setTotalRequests] = useState<number>(0);
  const [totalProcessos, setTotalProcessos] = useState<number>(0);

  useEffect(() => {
    getTotalRequests();
    getTotalProcessos();
  }, []);

  async function getTotalRequests() {
    await api.get("/api/totalizador/requisicoes").then((request) => {
      setTotalRequests(request.data.total);
    });
  }

  async function getTotalProcessos() {
    await api.get("/api/totalizador/processos").then((request) => {
      setTotalProcessos(request.data.total);
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
              <div className="col-12 col-md-4">
                {totalRequests != 0 ? (
                  <Totalizator
                    title="Requests Auditadas"
                    number={totalRequests}
                  ></Totalizator>
                ) : (
                  ""
                )}
              </div>
              <div className="col-12 col-md-4">
                {totalProcessos != 0 ? (
                  <Totalizator
                    title="Processos Registrados"
                    number={totalProcessos}
                  ></Totalizator>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Dashboard;
