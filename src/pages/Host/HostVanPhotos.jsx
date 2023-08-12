import React from 'react'
import { useOutletContext } from 'react-router-dom'

const HostVanPhotos = () => {
  const { van } = useOutletContext()

  return (
    <img
      className='host-van-detail-image'
      src={van.imageUrl}
      alt={van.name}
    ></img>
  )
}

export default HostVanPhotos
