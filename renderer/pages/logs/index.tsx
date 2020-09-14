import React, { useState, useEffect } from "react";
import Head from "next/head";

import HeaderList from "../../components/utils/headerlist";
import CardList from "../../components/cards/list";
import CardListNode from "../../components/cards/list/nodes";

import LogHelper from "../../helpers/LogHelper";
import DateHelper from "../../helpers/DateHelper";

function Logs() {
  const [logs, setLogs] = useState<Array<LogObject>>([]);

  useEffect(() => {
    console.log(LogHelper.getLogs());
    setLogs(LogHelper.getLogs());
    console.log("😁 Pegando logs");
  }, []);

  return (
    <>
      <Head>
        <title>Logs</title>
      </Head>
      <main>
        <HeaderList title="Logs">
          <p></p>
        </HeaderList>
        {logs.map((log) => (
          <CardList key={`${log.dateTime}`} title={`${DateHelper.getDateTimeFormat(log.dateTime)}`}>
            <CardListNode
              col="col-xs-12"
              field="Mensagem"
              value={`${log.error.message}`}
            />
            {log.error.source ? (
              <CardListNode
                col="col-xs-12"
                field="Arquivo"
                value={`${log.error.source}`}
              />
            ) : (
              ""
            )}
            {log.error.status ? (
              <CardListNode
                col="col-xs-12 col-md-4"
                field="Status"
                value={`${log.error.status}`}
              />
            ) : (
              ""
            )}
            {log.error.colNumber ? (
              <CardListNode
                col="col-xs-12 col-md-4"
                field="Número da Coluna"
                value={`${log.error.colNumber}`}
              />
            ) : (
              ""
            )}
            {log.error.lineNumber ? (
              <CardListNode
                col="col-xs-12 col-md-4"
                field="Número da Linha"
                value={`${log.error.lineNumber}`}
              />
            ) : (
              ""
            )}
          </CardList>
        ))}
      </main>
    </>
  );
}

export default Logs;
