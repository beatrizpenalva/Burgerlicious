import React from 'react'
import PropTypes from 'prop-types'
import 'bootstrap/dist/css/bootstrap.css'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'

const MenuAccordion = ({ handleChange }) => (
  <Accordion defaultActiveKey='0'>
    <Card>
      <Accordion.Toggle as={Card.Header} eventKey='0'>
        BREAKFAST
      </Accordion.Toggle>
      <Accordion.Collapse eventKey='0'>
        <Card.Body className='card-accordion'>
          <section className='item-menu'>
            <button
              type='button'
              className='menu-button'
              onClick={handleChange('Snacks')}
            >
              Snacks{' '}
              <span className='material-icons'> keyboard_arrow_right </span>
            </button>
            <button
              type='button'
              className='menu-button last-menu-item'
              onClick={handleChange('DrinksCoffee')}
            >
              Drinks{' '}
              <span className='material-icons'> keyboard_arrow_right</span>
            </button>
          </section>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
    <Card>
      <Accordion.Toggle as={Card.Header} eventKey='1'>
        BURGER
      </Accordion.Toggle>
      <Accordion.Collapse eventKey='1'>
        <Card.Body>
          <section className='item-menu'>
            <button
              type='button'
              className='menu-button'
              onClick={handleChange('Burgers')}
            >
              Burgers
              <span className='material-icons'> keyboard_arrow_right </span>
            </button>
            <button
              type='button'
              className='menu-button'
              onClick={handleChange('Sides')}
            >
              Sides{' '}
              <span className='material-icons'> keyboard_arrow_right </span>
            </button>
            <button
              type='button'
              className='menu-button last-menu-item'
              onClick={handleChange('Drinks')}
            >
              Drinks
              <span className='material-icons'> keyboard_arrow_right </span>
            </button>
          </section>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  </Accordion>
)

MenuAccordion.propTypes = {
  handleChange: PropTypes.func.isRequired,
}

export default MenuAccordion
