import React from 'react'
import PropTypes from 'prop-types'
import './ButtonText.styles.css'

const ButtonText = ({ label, handleClick }) => (
  <button type='button' className='count-button' onClick={handleClick}>
    {label}
  </button>
)

ButtonText.propTypes = {
  handleClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
}

export default ButtonText
