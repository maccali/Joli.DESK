import React from "react";

import styles from "./select.module.css";

type SelectFace = {
  name: string;
  identify: string;
  items: Array<string>;
  selected?: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
};

function Select({ name, identify, items, selected, onChange }: SelectFace) {
  return (
    <>
      <div className={styles.container}>
        <label htmlFor={identify}>{name}</label>
        <select
          name={identify}
          id={identify}
          onChange={onChange}
          value={selected}
        >
          {items.map((listitem) => (
            <option value={listitem}>{listitem}</option>
          ))}
        </select>
      </div>
    </>
  );
}

export default Select;
