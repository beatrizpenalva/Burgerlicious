/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React from 'react'
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

export default CardsKitchen
