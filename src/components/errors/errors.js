import React from 'react'
import PropTypes from 'prop-types'

const ErrorAuth = ({ code }) => {
  const verifyErrorCode = {
    '000': 'You have to choose your team-work. Please, try again.',
    400: 'Invalid email and/or password. Please, try again.',
    401: 'User not authenticated. Please, try again.',
    403: 'Email already in use at another restaurant. Please, try with a different e-mail.',
    404: 'User not found. Please, try again.',
    405: 'Passwords do not match. Please try again.',
  }

  let errorMessage = verifyErrorCode[code]

  if (!errorMessage) {
    errorMessage = 'Ops! Something went wrong. Please, try again.'
  }

  return (
    <>
      <p id='error-login'>{errorMessage}</p>
    </>
  )
}

ErrorAuth.propTypes = {
  code: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
}

export default ErrorAuth
