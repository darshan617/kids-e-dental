import React from 'react'
import Header from './header/Header'
import Footer from './footer/Footer'

const Layout = ({ children }) => {
  return (
    <div className="pageBody">
      <Header />
      <main className="pageWrapper">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout