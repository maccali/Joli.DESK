import React, { useState, useEffect } from "react";
import Inline from "../inline";

import { FaFileArchive } from "react-icons/fa";

import styles from "./input.module.css";

type InputFace = {
  type: string;
  name: string;
  value?: any;
  title?: string;
  placeholder?: string;
  fileName?: string;
  wrongMessage?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement & HTMLTextAreaElement>;
};

function File({
  type,
  name,
  title,
  value,
  placeholder,
  wrongMessage,
  onChange,
  fileName,
}: InputFace) {
  return (
    <>
      <div className={styles.inputcont}>
        {title ? <span>{title}</span> : ""}
        <div className={styles.card}>
          {value !== "" ? (
            <>
              <p>Valor Atual</p>
              <a href={value} target="_blank">
                <FaFileArchive />
                Abrir Arquivo
              </a>
            </>
          ) : (
            ""
          )}
          <p>Selecionar um Novo</p>
          <input
            type={type}
            onChange={onChange}
            placeholder={placeholder}
            name={name}
          />
          {/* <span className={styles.filename}>{fileName}</span> */}
        </div>
        {wrongMessage ? (
          <div>
            <Inline type="error" message={wrongMessage} />
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default File;
