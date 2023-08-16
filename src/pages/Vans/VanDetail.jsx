import React, { useEffect, useState } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'

import useGetVanDetail from '../../hooks/useGetVanDetail'
import Spinner from '../../components/Spinner'

function VanDetail() {
  const [van, setVan] = useState(null)

  const { id } = useParams()
  const location = useLocation()

  console.log(location)

  useEffect(() => {
    fetch(`/api/vans/${id}`)
      .then((res) => res.json())
      .then((data) => setVan(data.vans))
  }, [id])

  const search = location.state?.search || ''
  const tag = location.state?.type || 'all'

  console.log(tag)

  return (
    <React.Fragment>
      {van ? (
        <div className='van-detail-container'>
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
        </div>
      ) : (
        <Spinner />
      )}
    </React.Fragment>
  )
}

export default VanDetail
