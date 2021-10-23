import React from 'react'
import PropTypes from 'prop-types'
import LogoImg from './Logo.svg'
import './Logo.styles.css'

const Logo = ({ size }) => (
  <img src={LogoImg} alt='Burgerlicious logo' className={size} />
)

Logo.propTypes = {
  size: PropTypes.string.isRequired,
}

export default Logo
