/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import PropTypes from 'prop-types'
import './SelectField.styles.css'

const SelectField = ({ label, options, handleChange }) => (
  <label>
    {label}
    <select
      className='select-style'
      onChange={(e) => handleChange(e)}
      defaultValue='Team work'
      required
    >
      {options.map((item) => {
        const isDisabled = () => {
          if (item === 'Team work') return true
          return false
        }

        return (
          <option value={item} disabled={isDisabled()}>
            {item}
          </option>
        )
      })}
    </select>
  </label>
)

SelectField.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleChange: PropTypes.func.isRequired,
}

export default SelectField
