import React from 'react'
import { Link, useLocation, useLoaderData } from 'react-router-dom'

import { getVanById } from '../../api'

export const loader = ({ params }) => {
  //console.log(params)
  const { id } = params
  return getVanById(id)
}

function VanDetail() {
  const van = useLoaderData()

  const location = useLocation()

  //console.log(location)

  const search = location.state?.search || ''
  const tag = location.state?.type || 'all'

  //console.log(tag)

  return (
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
  )
}

export default VanDetail
