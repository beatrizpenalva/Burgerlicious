import React from 'react'
import PropTypes from 'prop-types'
import './ButtonCard.styles.css'

const ButtonCard = ({ label, handleClick, classStyle }) => (
  <button
    type='button'
    onClick={() => handleClick()}
    className={`button-card ${classStyle}`}
  >
    {' '}
    {label}{' '}
  </button>
)

ButtonCard.propTypes = {
  label: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  classStyle: PropTypes.string.isRequired,
}

export default ButtonCard
