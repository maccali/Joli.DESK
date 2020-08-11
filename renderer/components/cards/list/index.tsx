import React, { ReactNode } from 'react'


import styles from './list.module.css'

type CardListFace = {
  title: string;
  children: ReactNode;
}

function CardList({
  title,
  children,
}: CardListFace) {

  return (
    <>
      <div className="container-fluid">
        <div className={`container ${styles.cont}`}>
          <h4>{title}</h4>
          <div className="row">
            {children}
          </div>
        </div>
      </div>
    </>
  )

}

export default CardList
