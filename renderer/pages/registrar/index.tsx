import React from 'react'
import Head from 'next/head'

import RegisterContent from '../../components/content/register'

function Register() {

  return (
    <>
      <Head>
        <title>🔑 Cadastrar</title>
      </Head>
      <main>
        <RegisterContent />
      </main>
    </>
  )
}

export default Register
