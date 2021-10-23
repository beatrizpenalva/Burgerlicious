import React from 'react'
import PropTypes from 'prop-types'

const ErrorMessage = ({ code }) => {
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
      <p className='error-login'>{errorMessage}</p>
    </>
  )
}

ErrorMessage.propTypes = {
  code: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
}

export default ErrorMessage
