import React, { Suspense } from 'react'
import { Link, useLoaderData, defer, Await } from 'react-router-dom'
import { getHostVans } from '../../api'
import { protectedRoute } from '../../utils'
import Spinner from '../../components/Spinner'

export const loader = async ({ request }) => {
  await protectedRoute(request)
  return defer({ vans: getHostVans() })
}

const HostVans = () => {
  const hostVansPromise = useLoaderData()

  const renderHostVans = (vans) => {
    const hostVansEls = vans.map((van) => (
      <Link to={`${van.id}`} key={van.id} className='host-van-link-wrapper'>
        <div className='host-van-single' key={van.id}>
          <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
          <div className='host-van-info'>
            <h3>{van.name}</h3>
            <p>${van.price}/day</p>
          </div>
        </div>
      </Link>
    ))

    return (
      <div className='host-vans-list'>
        {vans.length > 0 ? (
          <section>{hostVansEls}</section>
        ) : (
          <h2>You don't host any van</h2>
        )}
      </div>
    )
  }

  return (
    <section>
      <h1 className='host-vans-title'>Your listed vans</h1>
      <Suspense fallback={<Spinner />}>
        <Await resolve={hostVansPromise.vans}>{renderHostVans}</Await>
      </Suspense>
    </section>
  )
}

export default HostVans
