import React, { Suspense } from 'react'
import {
  Link,
  useSearchParams,
  useLoaderData,
  defer,
  Await,
} from 'react-router-dom'
import Spinner from '../../components/Spinner'
import { getAllVans } from '../../api'

export const loader = () => {
  return defer({ vans: getAllVans() })
}

function Vans() {
  const [searchParams, setSearchParams] = useSearchParams()

  const dataPromise = useLoaderData()
  // console.log(vansData)

  const typeFilter = searchParams.get('type')
  //console.log(typeFilter)
  console.log(searchParams.toString())

  const handleFilterChange = (key, value) => {
    setSearchParams((prevParams) => {
      if (value === null) {
        prevParams.delete(key)
      } else {
        prevParams.set(key, value)
      }
      return prevParams
    })
  }

  const renderVansElements = (vansData) => {
    let filterData = typeFilter
      ? vansData.filter((v) => v.type === typeFilter)
      : vansData

    const vansElements = filterData.map((v) => (
      <div key={v.id} className='van-tile'>
        <Link
          to={`${v.id}`}
          state={{
            search: `?${searchParams.toString()}`,
            type: typeFilter,
          }}
        >
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
      <React.Fragment>
        <div className='van-list-filter-buttons'>
          <button
            onClick={() => handleFilterChange('type', 'simple')}
            className={`van-type simple 
                        ${typeFilter === 'simple' ? 'selected' : ''}`}
          >
            Simple
          </button>
          <button
            onClick={() => handleFilterChange('type', 'luxury')}
            className={`van-type luxury 
                        ${typeFilter === 'luxury' ? 'selected' : ''}`}
          >
            Luxury
          </button>
          <button
            onClick={() => handleFilterChange('type', 'rugged')}
            className={`van-type rugged 
                        ${typeFilter === 'rugged' ? 'selected' : ''}`}
          >
            Rugged
          </button>
          {typeFilter && (
            <button
              onClick={() => setSearchParams({})}
              className='van-type clear-filters'
            >
              Clear filter
            </button>
          )}
        </div>
        <div className='van-list'>{vansData.length > 0 && vansElements}</div>
      </React.Fragment>
    )
  }

  return (
    <div className='van-list-container'>
      <h1>Explore our van options</h1>
      <Suspense fallback={<Spinner />}>
        <Await resolve={dataPromise.vans}>{renderVansElements}</Await>
      </Suspense>
    </div>
  )
}

export default Vans
