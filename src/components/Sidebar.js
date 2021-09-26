/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-cycle */
import React, { useState } from 'react'
import ButtonSidebar from './Buttonsidebar'
import ListOrders from './Listallorders'

const Sidebar = ({ filterType, title }) => {
  const [isOpen, setIsOpen] = useState(false)
  setTimeout(() => setIsOpen(true), 100)

  return (
    <section className={isOpen ? 'open' : ''}>
      <div className='overlay-dark' />
      <div className='sidebar'>
        <div>
          <section>
            <ButtonSidebar id={null} key={null} className='close-button'>
              <span className='material-icons'>close</span>
            </ButtonSidebar>
          </section>
        </div>
        <div className='sidebar-container'>
          <div>
            <h2 className='title-sidebar'>{title}</h2>
            <section>
              <ListOrders filterType={filterType} />
            </section>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Sidebar
