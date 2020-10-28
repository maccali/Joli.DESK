import React, { useState } from 'react'
import styles from './login.module.css'

// Validation Lib
import * as yup from "yup";
import YupHelper from '../../../helpers/YupHelper'
import ErrorHelper from '../../../helpers/ErrorHelper'

// Api & auth 
import api from '../../../services/api'
import Auth from '../../../helpers/Auth'

// Local Abstractions
import Button from '../../utils/button'
import Input from '../../utils/input'
import CardForms from '../../cards/forms'
import Inline from '../../utils/inline'


const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email('O valor digitado deve ser um Email')
    .required('Digite um email'),
  password: yup
    .string()
    .required('Digite uma senha'),
});


function LoginContent() {

  const [email, setEmail] = useState<string>('');
  const [emailErrorMsg, setEmailErrorMsg] = useState<string>('');
  
  const [password, setPassword] = useState<string>('');
  const [passwordErrorMsg, setPasswordErrorMsg] = useState<string>('');
  
  const [serverErrorMsg, setServerErrorMsg] = useState<string>('');

  const [load, setLoad] = useState<boolean>(false);

  function clear() {
    setEmailErrorMsg('')
    setPasswordErrorMsg('')
    setServerErrorMsg('')
  }

  async function sendRequest(data: any) {
    
    api.post('/api/auth/login', data)
      .then((response: any) => {
        if (response.status === 200) {
          const { access_token, expires_in } = response.data

          Auth.saveToken(access_token, String(expires_in))

          console.log(Auth.getToken())

          window.location.href = '/dashboard'

        }
        setLoad(false)
      }).catch((error) => {

        var solve = ErrorHelper.interpreter(error)
        setServerErrorMsg('Ocorreu um erro tente novamente')

        if (solve) {
          setServerErrorMsg(solve)
        }

        if (error.status === 401) {
          setServerErrorMsg('Email ou senha errados')
        }
        setLoad(false)
      })
  }

  function handleSubmit() {
    clear()
    setLoad(true)
    LoginSchema.validate({
      email,
      password,
    }, { abortEarly: false })
      .then((data) => {
        console.log('😘 Dados válidos')
        sendRequest(data)
      })
      .catch(function (err) {
        console.log('😥 Dados inválidos')

        var errors = YupHelper.errorTreatment(err)

        errors.map((item) => {
          if (item.field === "email") {
            // setEmailError(true)
            setEmailErrorMsg(item.message)
          }
          if (item.field === "password") {
            // setPasswordError(true)
            setPasswordErrorMsg(item.message)
          }
        })

        setLoad(false)
      });
  }
  // function handleSubmit() {
  //   window.location.href = '/dashboard'
  // }

  return (
    <>
      <div className="container-fluid container-full-height">
        <div className="content flex-center">
          <div>
          </div>
          <CardForms
            title="Login"
          >
            <div className={styles.inputs}>
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
                title="Cadastrar"
                href='/registrar'
                textOnly
              >
                <span>Cadastrar</span>
              </Button>
              <Button
                title="Acessar o Sistema"
                action={() => handleSubmit()}
                load={load}
              >
                <p>👻</p>
                <span>Entrar</span>
              </Button>
            </div>
            <div className={styles.letters}>
              <span>Esqueceu a senha?
              <Button
                  title="Recuperar Senha"
                  href='/recuperar'
                  noStyle
                >
                  <b className="ml-1">Recupere</b>
                </Button>
              </span>
            </div>
          </CardForms>
        </div>
      </div>
    </>
  )
}

export default LoginContent