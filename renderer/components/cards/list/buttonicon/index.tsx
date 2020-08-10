import React, { ReactNode } from 'react'

import styles from './buttonicon.module.css'

type BtnIconCardFace = {
  children: ReactNode;
}

function CardListBtnIcon({
  children,
}: BtnIconCardFace) {

  return (
    <>
      <div className={styles.btn}>
        {children}
      </div>
    </>
  )

}

export default CardListBtnIcon
