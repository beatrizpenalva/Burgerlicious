import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { CallAPI, RequestOptions } from '../../services/api'
import Anchor from '../../components/atoms/Anchor'
import Footer from '../../components/molecules/Footer'
import Logo from '../../components/atoms/Logo'
import ErrorMessage from '../../components/atoms/ErrorMessage'
import ButtonContained from '../../components/atoms/ButtonContained'
import TextField from '../../components/atoms/TextField'
import SelectField from '../../components/atoms/SelectField'

const Register = () => {
  const history = useHistory()
  const [user, setUser] = useState({})
  const [statusCode, setStatusCode] = useState('')

  useEffect(() => {
    setUser({ ...user, completeName: `${user.name} ${user.lastName}` })
  }, [user.name, user.lastName])

  const handleError = (code) => {
    setStatusCode('')
    setStatusCode(code)
  }

  const redirectUser = (role) => {
    if (role === 'hall') history.push('/Hall')
    else if (role === 'kitchen') history.push('/Kitchen')
  }

  const handleRequest = (requestMethod) => {
    CallAPI('users', requestMethod).then((json) => {
      const { token, code, role } = json
      localStorage.setItem(`currentUser`, JSON.stringify(json))
      localStorage.setItem(`token`, `${token}`)

      return code ? handleError(String(code)) : redirectUser(role)
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { email, password, confirmPassword, role, completeName } = user
    if (password !== confirmPassword) handleError('405')
    else {
      const body = `email=${email}&password=${password}&role=${role}&restaurant=Burgerlicious&name=${completeName}`
      const method = RequestOptions.post(body)
      handleRequest(method)
    }
  }

  const handleChange = (e, key) => setUser({ ...user, [key]: e.target.value })

  return (
    <>
      <div className='inputs-container'>
        <div className='container-logo-btn'>
          <p className='back-button'>
            <Anchor link='/' label='BACK' isLink />
          </p>
          <Logo size='large' />
        </div>

        <form
          onSubmit={(event) => {
            handleSubmit(event)
          }}
        >
          <TextField
            label='Name:'
            type='text'
            value={user.name}
            placeholder='Name'
            handleChange={(e) => handleChange(e, 'name')}
            required
          />

          <TextField
            label='Last name:'
            type='text'
            value={user.lastName}
            placeholder='Last name'
            handleChange={(e) => handleChange(e, 'lastName')}
            required
          />

          <TextField
            label='Email:'
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

          <TextField
            label='Confirm password:'
            type='password'
            value={user.confirmPassword}
            placeholder='********'
            handleChange={(e) => handleChange(e, 'confirmPassword')}
            required
          />

          <SelectField
            label='Team:'
            options={['Team work', 'Hall', 'Kitchen']}
            handleChange={(e) => handleChange(e, 'role')}
          />

          {statusCode && <ErrorMessage code={statusCode} />}

          <ButtonContained
            type='submit'
            classStyle='filled'
            label='SIGN UP'
            handleClick={handleSubmit}
          />
        </form>
      </div>

      <Footer />
    </>
  )
}

export default Register
