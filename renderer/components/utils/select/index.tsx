import React, { useEffect } from "react";

import styles from "./select.module.css";

type SelectFace = {
  name: string;
  identify: string;
  items: Array<string>;
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
          {items.map((listitem) =>
            listitem === def ? (
              <option selected value={listitem}>
                {listitem}
              </option>
            ) : (
              <option value={listitem}>{listitem}</option>
            )
          )}
        </select>
      </div>
    </>
  );
}

export default Select;
