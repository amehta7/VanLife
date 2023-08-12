import React, { useEffect, useState } from 'react'
import { useParams, NavLink, Link, Outlet } from 'react-router-dom'
import Spinner from '../../components/Spinner'

const HostVanDetail = () => {
  const [van, setVan] = useState(null)

  const { id } = useParams()

  useEffect(() => {
    fetch(`/api/host/vans/${id}`)
      .then((res) => res.json())
      .then((data) => setVan(data.vans))
  }, [id])

  //console.log(van)

  const styles = {
    fontWeight: 'bold',
    textDecoration: 'underline',
    color: '#161616',
  }

  if (!van) {
    return <Spinner />
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
