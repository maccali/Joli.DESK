import React, { useEffect, useState } from "react";
import Head from "next/head";

import HeaderList from "../../components/utils/headerlist";
import Button from "../../components/utils/button";
import { GrDocumentPdf } from "react-icons/gr";
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

  function criaPDF() {
    var minhaTabela = document.getElementById("data").innerHTML;
    var style = "<style>";
    style = style + "table {width: 100%;font: 20px Calibri;}";
    style =
      style +
      "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
    style = style + "padding: 2px 3px;text-align: center;}";
    style = style + "</style>";
    // CRIA UM OBJETO WINDOW
    var win = window.open("", "", "height=700,width=700");
    win.document.write("<html><head>");
    win.document.write("<title>Gráficos</title>"); // <title> CABEÇALHO DO PDF.
    win.document.write(style); // INCLUI UM ESTILO NA TAB HEAD
    win.document.write("</head>");
    win.document.write("<body>");
    win.document.write(minhaTabela); // O CONTEUDO DA TABELA DENTRO DA TAG BODY
    win.document.write("</body></html>");
    win.document.close(); // FECHA A JANELA
    win.print(); // IMPRIME O CONTEUDO
  }

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
        <HeaderList title="Métricas">
          <Button
            title="Filtro"
            action={() => {
              criaPDF();
            }}
            iconOnly
          >
            <GrDocumentPdf />
          </Button>
        </HeaderList>
        <div className="container-fluid">
          <div id="data" className={`container`}>
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
