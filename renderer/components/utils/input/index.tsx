import React from 'react'
import NumberFormat from 'react-number-format';
import Inline from '../inline'

import styles from './input.module.css'

type InputFace = {
  type: 'email' | 'password' | 'text' | 'textarea' | 'number' | 'email' | 'url';
  name: string;
  value: any;
  title?: string;
  placeholder?: string;
  wrongMessage?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement & HTMLTextAreaElement>;
}

function Input({
  type,
  name,
  title,
  value,
  placeholder,
  wrongMessage,
  onChange,
}: InputFace) {

  if (type === "textarea") {
    return (
      <>
        <div className={styles.inputcont}>
          {title ?
            <label htmlFor={`${name}`}>{title}</label>
            : ''}
          <textarea
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            name={name}
          >
          </textarea>
          {wrongMessage ? <div>
            <Inline
              type="error"
              message={wrongMessage}
            />
          </div> : ''}
        </div>
      </>
    )
  }

  if (type === "number") {

    return (
      <>
        <div className={styles.inputcont}>
          {title ?
            <label htmlFor={`${name}`}>{title}</label>
            : ''}
          <NumberFormat
            type='text'
            value={value}
            onChange={onChange}
            decimalSeparator={false}
          />
          {wrongMessage ? <div>
            <Inline
              type="error"
              message={wrongMessage}
            />
          </div> : ''}
        </div>

      </>
    )
  }

  return (
    <>
      <div className={styles.inputcont}>
        {title ?
          <label htmlFor={`${name}`}>{title}</label>
          : ''}
        <input
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
          name={name}
        />
        {wrongMessage ? <div>
          <Inline
            type="error"
            message={wrongMessage}
          />
        </div> : ''}
      </div>
    </>
  )
}

export default Input
