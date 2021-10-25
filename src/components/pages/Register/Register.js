import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import CallAPI from '../../../services/api'
import RequestOptions from '../../../services/requestOptions'
import Footer from '../../molecules/Footer'
import Logo from '../../atoms/Logo'
import ErrorMessage from '../../atoms/ErrorMessage'
import ButtonContained from '../../atoms/ButtonContained'
import TextField from '../../atoms/TextField'
import SelectField from '../../atoms/SelectField'

const Register = () => {
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
  const history = useHistory()

  const [user, setUser] = useState(userData)
  const [statusCode, setStatusCode] = useState('')

  useEffect(() => {
    setUser({ ...user, completeName: `${user.name} ${user.lastName}` })
  }, [user.name, user.lastName])

  const createUser = (userObj) => {
    const { email, password, role, completeName, users } = userObj
    if (role === '') {
      setStatusCode('')
      setStatusCode('000')
    } else {
      const body = `email=${email}&password=${password}&role=${role}&restaurant=Burgerlicious&name=${completeName}`
      const method = RequestOptions.post(body)

      CallAPI(users, method).then((json) => {
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
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (user.password === user.confirmPassword) {
      createUser(user)
    } else {
      setStatusCode('405')
    }
  }

  const handleChange = (e, key) => {
    setUser({ ...user, [key]: e.target.value })
  }

  return (
    <>
      <div className='inputs-container'>
        <div className='container-logo-btn'>
          <p className='back-button'>
            <Link to='/'>BACK</Link>
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
