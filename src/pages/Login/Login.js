import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { CallAPI, RequestOptions } from '../../services/api'
import Anchor from '../../components/atoms/Anchor'
import ButtonContained from '../../components/atoms/ButtonContained'
import ErrorMessage from '../../components/atoms/ErrorMessage'
import Footer from '../../components/molecules/Footer'
import Logo from '../../components/atoms/Logo'
import TextField from '../../components/atoms/TextField'
import './Login.styles.css'

const Login = () => {
  const history = useHistory()
  const [user, setUser] = useState({})
  const [statusCode, setStatusCode] = useState('')

  const handleError = (error) => {
    setStatusCode('')
    setStatusCode(error)
  }

  const redirectUser = (role) => {
    if (role === 'hall') return history.push('/Hall')
    if (role === 'kitchen') return history.push('/Kitchen')
    return handleError('000')
  }

  const handleRequest = (url, requestMethod) => {
    CallAPI(url, requestMethod).then((json) => {
      const { token, code, role } = json
      localStorage.setItem(`currentUser`, JSON.stringify(json))
      localStorage.setItem(`token`, `${token}`)
      if (!json.code) redirectUser(role)
      else handleError(String(code))
    })
  }

  const handleChange = (e, key) => {
    setUser({ ...user, [key]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const requestBody = `email=${user.email}&password=${user.password}`
    const requestMethod = RequestOptions.post(requestBody)
    handleRequest('auth', requestMethod)
  }

  return (
    <>
      <main>
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
            Do not have an account?
            <Anchor link='/Register' label='Register' isLink />
          </p>
        </form>
      </main>
      <Footer />
    </>
  )
}

export default Login
