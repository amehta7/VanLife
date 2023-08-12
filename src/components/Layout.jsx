import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

const Layout = () => {
  return (
    <React.Fragment>
      <div className='site-wrapper'>
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
      <Footer />
    </React.Fragment>
  )
}

export default Layout
