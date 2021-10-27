import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import RequestOptions from '../../services/requestOptions'
import Logo from '../../components/atoms/Logo'
import Footer from '../../components/molecules/Footer'
import CallAPI from '../../services/api'
import ErrorMessage from '../../components/atoms/ErrorMessage'
import ButtonContained from '../../components/atoms/ButtonContained'
import TextField from '../../components/atoms/TextField'
import './Login.styles.css'

const userData = {
  auth: 'https://lab-api-bq.herokuapp.com/auth',
  users: 'https://lab-api-bq.herokuapp.com/users',
  name: '',
  lastName: '',
  email: '',
  role: '',
  password: '',
  confirmPassword: '',
  token: '',
}

const Login = () => {
  const history = useHistory()
  const [user, setUser] = useState(userData)
  const [statusCode, setStatusCode] = useState('')

  const loginPage = (userObj) => {
    const { email, password, auth } = userObj
    const body = `email=${email}&password=${password}`
    const method = RequestOptions.post(body)

    CallAPI(auth, method).then((json) => {
      localStorage.setItem(`currentUser`, JSON.stringify(json))
      localStorage.setItem(`token`, `${json.token}`)
      if (json.code) {
        setStatusCode('')
        setStatusCode(String(json.code))
      } else if (json.role === 'hall') {
        history.push('/Hall')
      } else {
        history.push('/Kitchen')
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    loginPage(user)
  }

  const handleChange = (e, key) => {
    setUser({ ...user, [key]: e.target.value })
  }

  return (
    <>
      <div className='inputs-container'>
        <Logo size='large' />
        <form
          onSubmit={(e) => {
            handleSubmit(e)
          }}
        >
          <TextField
            label='Login:'
            type='email'
            value={user.email}
            placeholder='email@email.com'
            handleChange={(e) => handleChange(e, 'email')}
            required
          />

          <TextField
            label='Password:'
            type='password'
            value={user.password}
            placeholder='********'
            handleChange={(e) => handleChange(e, 'password')}
            required
          />

          {statusCode && <ErrorMessage code={statusCode} />}
          <ButtonContained
            type='submit'
            classStyle='filled'
            label='SIGN IN'
            handleClick={handleSubmit}
          />
          <p className='message-text'>
            {' '}
            Do not have an account?{' '}
            <span>
              {' '}
              <Link to='/Register'>Register</Link>{' '}
            </span>
          </p>
        </form>
      </div>
      <Footer />
    </>
  )
}

export default Login
