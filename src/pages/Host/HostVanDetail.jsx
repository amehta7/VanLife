import React, { useEffect, useState } from 'react'
import { useParams, NavLink } from 'react-router-dom'
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

  if (!van) {
    return <Spinner />
  }

  return (
    <section>
      <div className='host-van-detail-layout-container'>
        <div className='host-van-detail'>
          <img src={van.imageUrl} />
          <div className='host-van-detail-info-text'>
            <i className={`van-type van-type-${van.type}`}>{van.type}</i>
            <h3>{van.name}</h3>
            <h4>${van.price}/day</h4>
          </div>
        </div>
      </div>
      <NavLink to='/details'>Details</NavLink>
      <NavLink to='/pricing'>Pricing</NavLink>
      <NavLink to='/photos'>Photos</NavLink>
    </section>
  )
}

export default HostVanDetail
