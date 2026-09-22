import React from 'react'
import Header from './header/Header'
import Footer from './footer/Footer'

const Layout = ({children}) => {
  return (
    <>
    <Header />
      <main className="pageWrapper">{children}</main>
      <Footer />
    </>
  );
};

export default Layout