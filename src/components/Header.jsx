import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import Logo from '../assets/images/logo.png'
import LoginIcon from '../assets/images/4130647-200.png'

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
        <Link to='login' className='login-link'>
          <img src={LoginIcon} alt='login_icon' className='login-icon' />
        </Link>
      </nav>
    </header>
  )
}

export default Header
