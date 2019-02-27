import { Fragment } from 'react';
import Head from 'next/head';

const Layout = ({ children }) => (
  <Fragment>
    <Head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css" />
    </Head>
    {children}
  </Fragment>
)

export default Layout
