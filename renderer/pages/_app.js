import React, { useLayoutEffect, useState, useEffect } from 'react'

// Custom styles
import '../public/custom/css/black-dashboard-react.min.css'
import '../public/custom/css/demo.css'
import '../public/custom/css/template.css'

// External Components
import 'react-datepicker/dist/react-datepicker.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';

import Nav from '../components/utils/Nav'
import Auth from '../helpers/Auth.ts'
import AuthError from '../components/content/AuthError'


// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {

  // const router = useRouter();
  const [allowLoad, setAllowLoad] = useState(false);
  const [allowNav, setAllowNav] = useState(false);
  const [takeOff, setTakeOff] = useState(false);


  const allowEntryPoints = [
    '/',
    '/registrar',
    '/registrar.html',
    '/recuperar',
    '/dashboard',
    '/grupos',
    '/icons',
    '/notifications',
    '/examples',
    '/examples/tablelist',
    '/examples/typografy',
    '/examples/userprofile',
  ];

  const prohibitNavigationBars = [
    '/',
    '/registrar',
    '/recuperar',
  ];

  function isElectron() {
    return Boolean(process.env.ELECTRON) === true
  }

  useLayoutEffect(() => {
    setTakeOff(false)
    var pathName = window.location.pathname

    if(pathName === "/home.html"){
      window.location.href = '/';
    }

    if (!allowEntryPoints.includes(pathName)) {
      console.log(`💋👀 Verificando Autenticidade para rota "${window.location.pathname}"`)
      if (!Auth.isAuth()) {
        setAllowLoad(false)
      } else {
        setAllowLoad(true)
      }
    } else {
      console.log(`👌👍 Rota Livre "${window.location.pathname}"`)
      setAllowLoad(true)
    }

    if (!prohibitNavigationBars.includes(pathName)) {
      setAllowNav(true)
    }
    setTakeOff(true)
  }, [])

  return <>
    {takeOff ?
      allowLoad ?
        <>
          {allowNav ? <Nav /> : ''}
          < Component {...pageProps} />
        </> :
        <AuthError />
      : ''}
  </>
}


