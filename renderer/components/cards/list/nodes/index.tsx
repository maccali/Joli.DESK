import React, { Children, ReactNode } from "react";

import styles from "./nodes.module.css";

type CardListNodeFace = {
  col: string;
  field: string;
  value: string;
  tag?: string;
  children?: ReactNode;
};

function CardListNode({ col, field, value, tag, children }: CardListNodeFace) {
  return (
    <>
      <div className={`${col}`}>
        <div className={styles.node}>
          <b>{field}</b>
          <div className={styles.inliner}>
            {tag ? (
              <span
                className={styles.tag}
                style={{
                  backgroundColor: tag,
                }}
              ></span>
            ) : (
              ""
            )}
            {children ? <div className={styles.child}>{children}</div> : value}
          </div>
        </div>
      </div>
    </>
  );
}

export default CardListNode;
