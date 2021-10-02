import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ children, ...props }) => (
  <button type='button' {...props}>
    {' '}
    {children}{' '}
  </button>
)

Button.propTypes = {
  children: PropTypes.string.isRequired,
}

export default Button
