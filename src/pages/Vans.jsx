import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

function Vans() {
  useEffect(() => {
    fetch('/api/vans')
      .then((res) => res.json())
      .then((data) => console.log(data))
  }, [])

  return (
    <div className='van-list-container'>
      <h1>Explore our van options</h1>
      <div className='van-list'>vans</div>
    </div>
  )
}

export default Vans
