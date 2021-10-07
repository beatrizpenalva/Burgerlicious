import React, { useState } from 'react'
import PropTypes from 'prop-types'
import MenuItems from './Menudetails'
import MenuAccordion from './Accordion'

const MenuEmSi = ({ addItem, handleError }) => {
  const [menuSection, setMenuSection] = useState('')

  const handleChange = (option) => {
    setMenuSection(option)
  }

  return (
    <>
      <section className='menu-info'>
        <section className='items-accordion'>
          <MenuAccordion handleChange={handleChange} />
        </section>

        <section className='section-details'>
          <MenuItems
            option={menuSection}
            addItem={addItem}
            handleError={handleError}
          />
        </section>
      </section>
    </>
  )
}

MenuEmSi.propTypes = {
  addItem: PropTypes.func.isRequired,
  handleError: PropTypes.func.isRequired,
}

export default MenuEmSi
