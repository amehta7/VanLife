import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Spinner from '../../components/Spinner'

function Vans() {
  const [vansData, setVansData] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()

  const typeFilter = searchParams.get('type')
  //console.log(typeFilter)

  useEffect(() => {
    fetch('/api/vans')
      .then((res) => res.json())
      .then((data) => setVansData(data.vans))
  }, [])

  let filterData = typeFilter
    ? vansData.filter((v) => v.type === typeFilter)
    : vansData

  const vansElements = filterData.map((v) => (
    <div key={v.id} className='van-tile'>
      <Link to={`${v.id}`}>
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
      <div className='van-list-filter-buttons'>
        {vansData.map((v) => (
          <button
            key={v.id}
            onClick={() => setSearchParams({ type: `${v.type}` })}
            className={`van-type ${v.type} ${
              v.type === typeFilter ? 'selected' : ''
            }`}
          >
            {v.type}
          </button>
        ))}
        {typeFilter && (
          <button
            onClick={() => setSearchParams({})}
            className='van-type clear-filters'
          >
            Clear filter
          </button>
        )}
      </div>
      <div className='van-list'>
        {vansData.length > 0 ? vansElements : <Spinner />}
      </div>
    </div>
  )
}

export default Vans
