import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import RequestOptions from '../../components/object/requestOptions'
import AllModelsObject from '../../components/object/models'
import Logo from '../../components/Logo/index'
import Container from '../../components/Main'
import Footer from '../../components/Footer/index'
import CallAPI from '../../services/api'
import ErrorAuth from '../../components/errors/errors'
import ButtonContained from '../../components/atoms/ButtonContained'
import TextField from '../../components/atoms/TextField'

const userData = AllModelsObject.authAndUsers

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
      <Container>
        <div className='inputs-container'>
          <Logo />
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

            {statusCode && <ErrorAuth code={statusCode} />}
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
      </Container>
      <Footer />
    </>
  )
}

export default Login
