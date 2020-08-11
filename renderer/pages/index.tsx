import React from 'react'
import Head from 'next/head'
import LoginContent from '../components/content/login'


function Home() {

  return (
    <>
      <Head>
        <title>🔑 Login | Admin</title>
      </Head>
      <main>
        <LoginContent />
      </main>
    </>
  )
}

export default Home
