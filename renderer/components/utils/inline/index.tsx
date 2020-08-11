import React from 'react'

import styles from './inline.module.css'

type InlineFace = {
  type: 'error' | 'warning' | 'success'
  message: string
  emoji?: string
}

function Inline({
  type,
  message,
  emoji,
}: InlineFace) {

  var color

  (type === 'error') ? color = '#9c0000' : '', 
  (type === 'warning') ? color = '#9c8200' : '', 
  (type === 'success') ? color = '#3c9c00' : ''

  return (
    <>
      <span style={{
        fontSize: '14px',
        fontWeight: 'bold',
        color,
      }} >
        {emoji ?
          <span className={styles.emoji}>{emoji}</span>
          : ''}
        <span>{message}</span>
      </span>
    </>
  )
}

export default Inline