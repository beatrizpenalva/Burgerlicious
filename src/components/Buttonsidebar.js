import React from 'react'
import PropTypes from 'prop-types'
import { SidebarContext } from './SidebarContext'

const ButtonSidebar = ({ children, ...props }) => {
  const sidebar = React.useContext(SidebarContext)

  function handleClick(event) {
    event.preventDefault()
    sidebar.setType(event.target.id)
    sidebar.setTitle(event.target.value)
    sidebar.setSidebarstatus((sidebarstatus) => !sidebarstatus)
  }

  return (
    <>
      <button type='button' {...props} onClick={(e) => handleClick(e)}>
        {' '}
        {children}{' '}
      </button>
    </>
  )
}

ButtonSidebar.propTypes = {
  children: PropTypes.string.isRequired,
}

export default ButtonSidebar
