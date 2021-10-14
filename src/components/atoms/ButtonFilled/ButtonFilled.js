import React from 'react'
import PropTypes from 'prop-types'
import './ButtonFilled.styles.css'

const ButtonFilled = ({ label, handleClick }) => (
  <button
    type='submit'
    className='button-filled'
    onClick={(e) => handleClick(e)}
  >
    {label}
  </button>
)

ButtonFilled.propTypes = {
  handleClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
}

export default ButtonFilled
