import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import RequestOptions from '../../components/object/requestOptions'
import AllModelsObject from '../../components/object/models'
import Logo from '../../components/Logo'
import Container from '../../components/Main'
import Footer from '../../components/Footer'
import CallAPI from '../../services/api'
import ErrorAuth from '../../components/errors/errors'

const userData = AllModelsObject.authAndUsers

const Login = () => {
  const history = useHistory()
  const [user, setUser] = useState(userData)
  const [statusCode, setStatusCode] = useState('')

  const loginPage = (props) => {
    const { email, password, auth } = props
    const body = `email=${email}&password=${password}`
    const method = RequestOptions.post(body)

    CallAPI(auth, method).then((json) => {
      localStorage.setItem(`currentUser`, JSON.stringify(json))
      localStorage.setItem(`token`, `${json.token}`)
      if (json.code) {
        setStatusCode('')
        setStatusCode(String(json.code))
      }

      if (json.role === 'hall') {
        history.push('/Hall')
      }

      if (json.role === 'kitchen') {
        history.push('/Kitchen')
      }
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    loginPage(user)
  }

  return (
    <>
      <Container>
        <div className='inputs-container'>
          <Logo />
          <form
            onSubmit={(event) => {
              handleSubmit(event)
            }}
          >
            <label htmlFor='login'>
              Login:
              <input
                id='login'
                type='email'
                className='form-input'
                value={user.email}
                onChange={(event) => {
                  setUser({ ...user, email: event.target.value })
                }}
                placeholder='email@email.com'
                required
              />
            </label>
            <label htmlFor='password'>
              Password:
              <input
                id='password'
                type='password'
                className='form-input'
                minLength='8'
                maxLength='12'
                value={user.password}
                onChange={(event) => {
                  setUser({ ...user, password: event.target.value })
                }}
                placeholder='Password'
                required
              />
            </label>
            {statusCode && <ErrorAuth code={statusCode} />}
            <button className='form-button' type='submit'>
              {' '}
              SIGN IN{' '}
            </button>
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
      </Container>
      <Footer />
    </>
  )
}

export default Login
