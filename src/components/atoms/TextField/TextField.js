/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import PropTypes from 'prop-types'
import './TextField.styles.css'

const TextField = ({
  type,
  label,
  placeholder,
  value,
  handleChange,
  required,
}) => (
  <label>
    {label}
    <input
      type={type}
      placeholder={placeholder}
      className='form-input'
      value={value}
      onChange={handleChange}
      required={required}
    />
  </label>
)

TextField.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  required: PropTypes.bool.isRequired,
}

export default TextField
