import React from 'react'
import PropTypes from 'prop-types'
import './Anchor.styles.css'

const Anchor = ({ link, label }) => <a href={link}>{label}</a>

Anchor.propTypes = {
  link: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
}

export default Anchor
