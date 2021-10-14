import React, { useState } from 'react'
import PropTypes from 'prop-types'
import MenuContent from '../MenuContent'
import MenuAccordion from '../MenuAccordion'

const Menu = ({ addItem, handleError }) => {
  const [menuSection, setMenuSection] = useState('')

  const handleChangeSection = (option) => {
    setMenuSection(option)
  }

  return (
    <>
      <section className='menu-info'>
        <section className='items-accordion'>
          <MenuAccordion handleChangeSection={handleChangeSection} />
        </section>

        <section className='section-details'>
          <MenuContent
            option={menuSection}
            addItem={addItem}
            handleError={handleError}
          />
        </section>
      </section>
    </>
  )
}

Menu.propTypes = {
  addItem: PropTypes.func.isRequired,
  handleError: PropTypes.func.isRequired,
}

export default Menu
