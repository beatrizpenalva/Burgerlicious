import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './Anchor.styles.css'

const Anchor = ({ link, label, isLink }) => {
  const redirect = isLink
  return (
    <>
      {!redirect && <a href={link}>{label}</a>}
      {redirect && <Link to={link}>{label}</Link>}
    </>
  )
}

Anchor.propTypes = {
  link: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isLink: PropTypes.bool.isRequired,
}

export default Anchor
