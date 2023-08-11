import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Spinner from '../../components/Spinner'

function Vans() {
  const [vansData, setVansData] = useState([])

  useEffect(() => {
    fetch('/api/vans')
      .then((res) => res.json())
      .then((data) => setVansData(data.vans))
  }, [])

  const vansElements = vansData.map((v) => (
    <div key={v.id} className='van-tile'>
      <Link to={`/vans/${v.id}`}>
        <img src={v.imageUrl} alt={v.name} />
        <div className='van-info'>
          <h3>{v.name}</h3>
          <p>
            ${v.price} <span>/day</span>
          </p>
        </div>
        <i className={`van-type ${v.type} selected`}>{v.type}</i>
      </Link>
    </div>
  ))

  return (
    <div className='van-list-container'>
      <h1>Explore our van options</h1>
      <div className='van-list'>
        {vansData.length > 0 ? vansElements : <Spinner />}
      </div>
    </div>
  )
}

export default Vans
