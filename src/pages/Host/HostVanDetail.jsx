import React, { Suspense } from 'react'
import {
  NavLink,
  Link,
  Outlet,
  useLoaderData,
  defer,
  Await,
} from 'react-router-dom'
import { getHostVanById } from '../../api'
import { protectedRoute } from '../../utils'
import Spinner from '../../components/Spinner'

export const loader = async ({ request, params }) => {
  const { id } = params
  await protectedRoute(request)
  return defer({ hostVan: getHostVanById(id) })
}

const HostVanDetail = () => {
  const vanPromise = useLoaderData()

  //console.log(vanPromise)

  const styles = {
    fontWeight: 'bold',
    textDecoration: 'underline',
    color: '#161616',
  }

  const renderHostVan = (van) => {
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

  return (
    <Suspense fallback={<Spinner />}>
      <Await resolve={vanPromise.hostVan}>{renderHostVan}</Await>
    </Suspense>
  )
}

export default HostVanDetail
