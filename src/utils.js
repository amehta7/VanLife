import React from 'react'
import { redirect } from 'react-router-dom'

export const protectedRoute = async () => {
  const isLoggedIn = false

  if (!isLoggedIn) {
    const response = redirect('/login?message=You must log in first.')
    response.body = true // It's silly, but it works
    return response
  }
  return null
}
