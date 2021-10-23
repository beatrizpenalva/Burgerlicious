/* eslint-disable react/require-default-props */
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
    {/* <span className={hasIcon ? 'none' : 'material-icons'}>{icon}</span> */}
  </button>
)

ButtonContained.propTypes = {
  handleClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  classStyle: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  // hasIcon: PropTypes.bool.isRequired,
  // icon: PropTypes.string,
}

export default ButtonContained
