import React, { useEffect } from "react";

import HeaderForm from "../../utils/headerform";

import CardList from "../../../components/cards/list";
import CardListNode from "../../../components/cards/list/nodes";

type OperatorCurrentFace = {
  userId: string;
  name: string;
  email: string;
  sociedade: Array<string>;
};

type RequestCurrentFace = {
  url: string;
  fulUrl: string;
  method: string;
  all: object;
};

type AuditCurrentFace = {
  auditHistoryId: string;
  status: string;
  time: string;
  operator?: OperatorCurrentFace;
  request?: RequestCurrentFace;
  response?: object;
};

type AuditViewerFace = {
  current: AuditCurrentFace;
};

function AuditViewer(Audit: AuditViewerFace) {
  return (
    <>
      <div className="container-fluid">
        <div className="container">
          <div className="row">
            <div className="col-xs col-md-12">
              <HeaderForm title="Visualizar Requisição" />
            </div>
            {/* <div className="col-xs col-md-12">
              {JSON.stringify(Audit.current)}
            </div> */}
            {/* <div className="col-xs col-md-12"> */}
            <CardList
              key={`${Audit.current.auditHistoryId}`}
              title={`Status - ${Audit.current.status}`}
            >
              <CardListNode
                col="col-xs-6"
                field="Id"
                value={Audit.current.auditHistoryId}
              />
              <CardListNode
                col="col-xs-6"
                field="Data"
                value={Audit.current.time}
              ></CardListNode>
            </CardList>
            {Audit.current.operator ? (
              <CardList
                key={`${Audit.current.operator}`}
                title={`Nome do Requisitante - ${Audit.current.operator.name}`}
              >
                <CardListNode
                  col="col-xs-6"
                  field="Email"
                  value={Audit.current.operator.email}
                />
                <CardListNode
                  col="col-xs-6"
                  field="Permissões"
                  value={JSON.stringify(Audit.current.operator.sociedade)}
                ></CardListNode>
              </CardList>
            ) : (
              ""
            )}
            {Audit.current.request ? (
              <CardList key={`${Audit.current.request}`} title={`Requisição`}>
                <CardListNode
                  col="col-xs-4"
                  field="Url"
                  value={Audit.current.request.url}
                />
                <CardListNode
                  col="col-xs-4"
                  field="Full Url"
                  value={JSON.stringify(Audit.current.request.fulUrl)}
                ></CardListNode>
                <CardListNode
                  col="col-xs-4"
                  field="Método"
                  value={JSON.stringify(Audit.current.request.method)}
                ></CardListNode>
              </CardList>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AuditViewer;
