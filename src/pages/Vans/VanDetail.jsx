import React, { Suspense } from 'react'
import {
  Link,
  useLocation,
  useLoaderData,
  defer,
  Await,
} from 'react-router-dom'

import { getVanById } from '../../api'
import Spinner from '../../components/Spinner'

export const loader = ({ params }) => {
  //console.log(params)
  const { id } = params
  return defer({ van: getVanById(id) })
}

function VanDetail() {
  const vanPromise = useLoaderData()

  const location = useLocation()

  //console.log(location)

  const search = location.state?.search || ''
  const tag = location.state?.type || 'all'

  //console.log(search)
  //console.log(tag)

  const renderVan = (van) => {
    return (
      <React.Fragment>
        <Link to={`..${search}`} relative='path' className='back-button'>
          &larr; <span>Back to {tag} vans</span>
        </Link>
        <div className='van-detail'>
          <img src={van.imageUrl} />
          <i className={`van-type ${van.type} selected`}>{van.type}</i>
          <h2>{van.name}</h2>
          <p className='van-price'>
            <span>${van.price}</span>/day
          </p>
          <p>{van.description}</p>
          <button className='link-button'>Rent this van</button>
        </div>
      </React.Fragment>
    )
  }

  return (
    <div className='van-detail-container'>
      <Suspense fallback={<Spinner />}>
        <Await resolve={vanPromise.van}>{renderVan}</Await>
      </Suspense>
    </div>
  )
}

export default VanDetail
