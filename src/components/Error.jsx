import React from 'react'
import { useRouteError } from 'react-router-dom'

const Error = () => {
  const error = useRouteError()
  console.log(error)

  return (
    <React.Fragment>
      <h1>Error: {error.message}</h1>
    </React.Fragment>
  )
}

export default Error
