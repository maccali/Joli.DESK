import React from "react";
import styles from "./linknode.module.css";

type CardLinkNodeFace = {
  link: string;
};

function CardLinkNode({ link }: CardLinkNodeFace) {
  return (
    <>
      <div className={styles.node}>
        <a href={process.env.API_URL + link} target="_blank">
          Ver Arquivo
         </a>
      </div>
    </>
  );
}

export default CardLinkNode;
