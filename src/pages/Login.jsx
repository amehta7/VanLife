import React from 'react'
import {
  useLoaderData,
  Form,
  redirect,
  useActionData,
  useNavigation,
} from 'react-router-dom'
import { loginUser } from '../api'

export const loader = ({ request }) => {
  //console.log(new URL(request.url).searchParams.get('message'))
  return new URL(request.url).searchParams.get('message')
}

export const action = async ({ request }) => {
  const formData = await request.formData()

  const email = formData.get('email')
  const password = formData.get('password')
  //console.log(email, password)

  const path = new URL(request.url).searchParams.get('redirectTo') || '/host'
  try {
    const data = await loginUser({ email, password })
    //console.log(data)

    localStorage.setItem('loggedin', true)

    const response = redirect(path)
    response.body = true // It's silly, but it works
    return response
  } catch (error) {
    return error.message
  }
}

const Login = () => {
  const message = useLoaderData()
  const errorMessage = useActionData()

  const navigation = useNavigation()
  //console.log(navigation)

  return (
    <div className='login-container'>
      <h1>Sign in to your account</h1>
      {message && <h3 className='red'>{message}</h3>}
      {errorMessage && <h3 className='red'>{errorMessage}</h3>}
      <Form className='login-form' method='post' replace>
        <input name='email' type='email' placeholder='Email address' required />
        <input
          name='password'
          type='password'
          placeholder='Password'
          required
        />
        <button disabled={navigation.state === 'submitting'}>
          {navigation.state === 'submitting' ? 'Logging in...' : 'Log in'}
        </button>
      </Form>
    </div>
  )
}

export default Login

//using useState

// const Login = () => {
//   const [loginFormData, setLoginFormData] = React.useState({
//     email: '',
//     password: '',
//   })
//   const [status, setStatus] = useState('idle')
//   const [error, setError] = useState(null)

//   const message = useLoaderData()

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     setStatus('submitting')
//     setError(null)

//     const loginSubmit = async () => {
//       try {
//         const data = await loginUser(loginFormData)

//         console.log(data)
//         //return data
//       } catch (error) {
//         //console.log(error)
//         setError(error)
//       } finally {
//         setStatus('idle')
//       }
//     }

//     loginSubmit()
//   }

//   const handleChange = (e) => {
//     setError(null)
//     const { name, value } = e.target
//     setLoginFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }))
//   }

//   return (
//     <div className='login-container'>
//       <h1>Sign in to your account</h1>
//       {message && <h3 className='red'>{message}</h3>}
//       {error && <h3 className='red'>{error.message}</h3>}
//       <Form className='login-form' onSubmit={handleSubmit}>
//         <input
//           name='email'
//           onChange={handleChange}
//           type='email'
//           placeholder='Email address'
//           value={loginFormData.email}
//           required
//         />
//         <input
//           name='password'
//           onChange={handleChange}
//           type='password'
//           placeholder='Password'
//           value={loginFormData.password}
//           required
//         />
//         <button disabled={status === 'submitting'}>
//           {status === 'submitting' ? 'Logging in...' : 'Log in'}
//         </button>
//       </Form>
//     </div>
//   )
// }
