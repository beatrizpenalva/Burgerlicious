/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-cycle */
import React from 'react'
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

export default ButtonSidebar
