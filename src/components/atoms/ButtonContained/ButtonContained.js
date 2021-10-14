/* eslint-disable react/button-has-type */
import React from 'react'
import PropTypes from 'prop-types'
import './ButtonContained.styles.css'

const ButtonContained = ({ label, handleClick, classStyle, type }) => (
  <button
    type={type}
    className={`button ${classStyle}`}
    onClick={(e) => handleClick(e)}
  >
    {label}
  </button>
)

ButtonContained.propTypes = {
  handleClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  classStyle: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}

export default ButtonContained
