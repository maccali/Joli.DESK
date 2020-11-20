import React, { ReactNode } from 'react'
import styles from './totalizator.module.css'

type TotalizatorFace = {
  title: string,
  number: ReactNode
}

function Totalizator(
  {
    title,
    number
  }: TotalizatorFace
) {
  return (
    <>
      <div className={styles.cont}>
        <div className={styles.header}>
          <h2>{title}</h2>
        </div>
        <div className={styles.body}>
          <p>{number}</p>
        </div>
      </div>
    </>
  )
}

export default Totalizator