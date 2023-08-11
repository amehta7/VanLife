import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import Logo from '../assets/images/logo.png'

const Header = () => {
  return (
    <header>
      <Link className='site-logo' to='/'>
        <img src={Logo} alt='logo' />
      </Link>
      <nav>
        <NavLink
          to='/host'
          className={({ isActive }) => (isActive ? 'active-link' : '')}
        >
          Host
        </NavLink>
        <NavLink
          to='/about'
          className={({ isActive }) => (isActive ? 'active-link' : '')}
        >
          About
        </NavLink>
        <NavLink
          to='/vans'
          className={({ isActive }) => (isActive ? 'active-link' : '')}
        >
          Vans
        </NavLink>
      </nav>
    </header>
  )
}

export default Header
