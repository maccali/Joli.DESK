import React from "react";
import styles from "./versionnode.module.css";
import DateHelper from "../../../helpers/DateHelper";

type CardVersionNodeFace = {
  versao: string;
  excluida?: string;
};

function CardVersionNode({ versao, excluida }: CardVersionNodeFace) {
  return (
    <>
      <div className={styles.node}>
        {!excluida ? (
          <p className={styles.atual}>{DateHelper.getDateTimeFormat(versao)}</p>
        ) : (
          <p  className={styles.deletada}>{DateHelper.getDateTimeFormat(versao)}</p>
        )}
      </div>
    </>
  );
}

export default CardVersionNode;
