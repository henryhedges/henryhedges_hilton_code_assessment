import { Fragment } from 'react'
import Head from 'next/head'

const Layout = ({ children }) => (
  <Fragment>
    <Head>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap-reboot.min.css"
      /> 
    </Head>
    {children}
  </Fragment>
)

export default Layout
