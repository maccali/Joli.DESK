import React, { ReactNode } from 'react'
import styles from './forms.module.css'

type CardFormsFace = {
  title: string,
  children: ReactNode
}

function CardForms(
  {
    title,
    children
  }: CardFormsFace
) {
  return (
    <>
      <div className={styles.cont}>
        <div className={styles.header}>
          <h1>{title}</h1>
        </div>
        <div className={styles.body}>
          {children}
        </div>
      </div>
    </>
  )
}

export default CardForms