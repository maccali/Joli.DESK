import React, { useState } from 'react'
import styles from './register.module.css'

// Validation Lib
import * as yup from "yup";
import YupHelper from '../../../helpers/YupHelper'
import ErrorHelper from '../../../helpers/ErrorHelper'

// Local Abstractions
import Button from '../../utils/button'
import Input from '../../utils/input'
import CardForms from '../../cards/forms'
import Inline from '../../utils/inline'


const RegisterSchema = yup.object().shape({
  nome: yup
    .string()
    .required('Digite um nome'),
  email: yup
    .string()
    .email('O valor digitado deve ser um Email')
    .required('Digite um email'),
  password: yup
    .string()
    .required('Digite uma senha'),
});


function RegisterContent() {

  const [nome, setNome] = useState<string>('');
  const [nomeErrorMsg, setNomeErrorMsg] = useState<string>('');

  const [email, setEmail] = useState<string>('');
  const [emailErrorMsg, setEmailErrorMsg] = useState<string>('');

  const [password, setPassword] = useState<string>('');
  const [passwordErrorMsg, setPasswordErrorMsg] = useState<string>('');

  const [serverErrorMsg, setServerErrorMsg] = useState<string>('');

  const [load, setLoad] = useState<boolean>(false);




  return (
    <>
      <div className="container-fluid container-full-height">
        <div className="content flex-center">
          <div>
          </div>
          <CardForms
            title="Registrar"
          >
            <div className={styles.inputs}>
              <Input
                type="text"
                name="nome"
                title="Nome Completo"
                value={nome}
                onChange={(event) => setNome(event.target.value)}
                wrongMessage={nomeErrorMsg}
              />

              <Input
                type="email"
                name="email"
                title="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                wrongMessage={emailErrorMsg}
              />

              <Input
                type="password"
                name="senha"
                title="Senha"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                wrongMessage={passwordErrorMsg}
              />
            </div>
            {serverErrorMsg != '' ?
              <Inline
                emoji='📡'
                type='error'
                message={serverErrorMsg}
              />
              : ''}
            <div className={styles.btns}>
              <Button
                title="Voltar"
                href='/'
                textOnly
              >
                <span>Voltar</span>
              </Button>
              <Button
                title="Métricas"
                href='/dashboard'
              >
                <p>🤺</p>
                <span>Enviar</span>
              </Button>
            </div>

          </CardForms>
        </div>
      </div>
    </>
  )
}

export default RegisterContent