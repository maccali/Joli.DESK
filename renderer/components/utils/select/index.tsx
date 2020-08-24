import React from 'react'

import styles from './select.module.css'

type SelectFace = {
  name: string
  identify: string,
  items: Array<string>,
  selected: string,
}

function Input({
  name,
  identify,
  items,
  selected
}: SelectFace) {

  return (
    <>
      <div className={styles.container}>
        <label htmlFor={identify}>{name}</label>
        <select name={identify} id={identify}>
          {items.map(listitem => 
            <option value={listitem}>{listitem}</option>
          )}
        </select>
      </div>
    </>
  )
}

export default Input
