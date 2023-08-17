import React from 'react'
import { useLoaderData } from 'react-router-dom'
import { loginUser } from '../api'

export const loader = ({ request }) => {
  //console.log(new URL(request.url).searchParams.get('message'))
  return new URL(request.url).searchParams.get('message')
}

const Login = () => {
  const [loginFormData, setLoginFormData] = React.useState({
    email: '',
    password: '',
  })

  const message = useLoaderData()

  const handleSubmit = (e) => {
    e.preventDefault()

    const loginSubmit = async () => {
      const data = await loginUser(loginFormData)
      console.log(data)
      return data
    }

    loginSubmit()
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setLoginFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className='login-container'>
      <h1>Sign in to your account</h1>
      {message && <h3 className='red'>{message}</h3>}
      <form onSubmit={handleSubmit} className='login-form'>
        <input
          name='email'
          onChange={handleChange}
          type='email'
          placeholder='Email address'
          value={loginFormData.email}
          required
        />
        <input
          name='password'
          onChange={handleChange}
          type='password'
          placeholder='Password'
          value={loginFormData.password}
          required
        />
        <button>Log in</button>
      </form>
    </div>
  )
}

export default Login
