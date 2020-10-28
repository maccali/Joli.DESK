import React from "react";

import styles from "./headerform.module.css";

type HeaderFormFace = {
  title: string;
};

function HeaderForm({ title }: HeaderFormFace) {
  return (
    <>
      <div className={styles.node}>
        <h2>{title}</h2>
      </div>
    </>
  );
}

export default HeaderForm;
