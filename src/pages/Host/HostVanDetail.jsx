import React from 'react'
import { NavLink, Link, Outlet, useLoaderData } from 'react-router-dom'
import { getHostVanById } from '../../api'
import { protectedRoute } from '../../utils'

export const loader = async ({ request, params }) => {
  const { id } = params
  await protectedRoute(request)
  return getHostVanById(id)
}

const HostVanDetail = () => {
  const van = useLoaderData()

  //console.log(van)

  const styles = {
    fontWeight: 'bold',
    textDecoration: 'underline',
    color: '#161616',
  }

  return (
    <section>
      <Link to='..' relative='path' className='back-button'>
        &larr; <span>Back to all vans</span>
      </Link>
      <div className='host-van-detail-layout-container'>
        <div className='host-van-detail'>
          <img src={van.imageUrl} />
          <div className='host-van-detail-info-text'>
            <i className={`van-type van-type-${van.type}`}>{van.type}</i>
            <h3>{van.name}</h3>
            <h4>
              ${van.price}
              <span>/day</span>
            </h4>
          </div>
        </div>
        <nav className='host-van-detail-nav'>
          <NavLink
            to='.'
            end
            style={({ isActive }) => (isActive ? styles : null)}
          >
            Details
          </NavLink>
          <NavLink
            to='pricing'
            style={({ isActive }) => (isActive ? styles : null)}
          >
            Pricing
          </NavLink>
          <NavLink
            to='photos'
            style={({ isActive }) => (isActive ? styles : null)}
          >
            Photos
          </NavLink>
        </nav>

        <Outlet context={{ van }} />
      </div>
    </section>
  )
}

export default HostVanDetail
