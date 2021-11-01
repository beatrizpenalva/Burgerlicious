import React from 'react'
import PropTypes from 'prop-types'
import './ButtonCard.styles.css'

const ButtonCard = ({ label, onClick, classStyle }) => (
  <button
    type='button'
    onClick={() => onClick()}
    className={`button-card ${classStyle}`}
  >
    {' '}
    {label}{' '}
  </button>
)

ButtonCard.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  classStyle: PropTypes.string.isRequired,
}

export default ButtonCard
