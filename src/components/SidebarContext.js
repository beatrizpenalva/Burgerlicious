/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
import React from 'react'
import Sidebar from './Sidebar'

export const SidebarContext = React.createContext()

export const SidebarStorage = ({ children }) => {
  const [sidebarstatus, setSidebarstatus] = React.useState(false)
  const [type, setType] = React.useState(null)
  const [title, setTitle] = React.useState(null)

  return (
    <SidebarContext.Provider
      value={{ sidebarstatus, setSidebarstatus, setType, setTitle }}
    >
      {sidebarstatus && type !== null && (
        <Sidebar filterType={type} title={title} />
      )}
      {children}
    </SidebarContext.Provider>
  )
}
