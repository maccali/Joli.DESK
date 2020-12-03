import React, { useEffect } from "react";

import styles from "./select.module.css";

type selectFace = {
  unique: string;
  value: string;
};

type SelectFace = {
  name: string;
  identify: string;
  items: Array<selectFace | string>;
  def?: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
};

function Select({ name, identify, items, def, onChange }: SelectFace) {
  useEffect(() => {
    console.log(items);
  }, []);

  return (
    <>
      <div className={styles.container}>
        <label htmlFor={identify}>{name}</label>
        <select name={identify} id={identify} onChange={onChange} value={def}>
          <option value="">Selecione</option>
          {items.map((listitem) =>
            typeof listitem === "string" ? (
              listitem === def ? (
                <option selected value={listitem}>
                  {listitem}
                </option>
              ) : (
                <option value={listitem}>{listitem}</option>
              )
            ) : listitem.unique === def ? (
              <option selected value={listitem.unique}>
                {listitem.value}
              </option>
            ) : (
              <option value={listitem.unique}>{listitem.value}</option>
            )
          )}
        </select>
      </div>
    </>
  );
}

export default Select;

// listitem.unique === def ? (
//   <option selected value={listitem.unique}>
//     {listitem.value}
//   </option>
// ) : (
//   <option value={listitem.unique}>{listitem.value}</option>
// )
