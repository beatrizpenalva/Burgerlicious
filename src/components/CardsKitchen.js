import React from 'react'
import PropTypes from 'prop-types'
import CardsHeader from './ComponentsCardsHeader'
import CardsBody from './ComponentsCardsBody'

const CardsKitchen = ({ children, props }) => (
  <>
    <div className='card-container-text'>
      <CardsHeader key={Math.random()}>{children}</CardsHeader>
      <hr />
      <CardsBody key={Math.random()} onClick={props}>
        {children}
      </CardsBody>
    </div>
  </>
)

CardsKitchen.propTypes = {
  children: PropTypes.string.isRequired,
  props: PropTypes.func.isRequired,
}

export default CardsKitchen
