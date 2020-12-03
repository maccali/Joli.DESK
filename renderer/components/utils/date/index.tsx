import React, { useState, useEffect } from "react";
import Inline from "../inline";

import styles from "./input.module.css";

type InputFace = {
  name: string;
  value?: any;
  title?: string;
  placeholder?: string;
  wrongMessage?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement & HTMLTextAreaElement>;
};

function Date({
  name,
  title,
  value,
  placeholder,
  wrongMessage,
  onChange,
}: InputFace) {
  return (
    <>
      <div className={styles.inputcont}>
        {title ? <span>{title}</span> : ""}
        <input
          type="date"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          name={name}
          // readOnly
        />
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

export default Date;
