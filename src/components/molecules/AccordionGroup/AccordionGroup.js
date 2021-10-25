/* eslint-disable react/prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import 'bootstrap/dist/css/bootstrap.css'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import './AccordionGroup.styles.css'

const AccordionGroup = ({ sections, handleChangeSection }) => (
  <Accordion defaultActiveKey='0'>
    {sections.map(({ header, options }) => (
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey='0'>
          {header}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey='0'>
          <Card.Body>
            {options.map((item) => (
              <section className='item-menu'>
                <button
                  type='button'
                  className='menu-button'
                  onClick={() => handleChangeSection(item)}
                >
                  {item}
                  <span className='material-icons'> keyboard_arrow_right </span>
                </button>
              </section>
            ))}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    ))}
  </Accordion>
)

AccordionGroup.propTypes = {
  handleChangeSection: PropTypes.func.isRequired,
}

export default AccordionGroup
