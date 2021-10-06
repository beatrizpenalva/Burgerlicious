/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Burgers = ({ getBurgerId }) => {
  const newBurger = {
    name: '',
    flavor: '',
    complement: '',
    quantity: 1,
  }

  const [burger, setBurger] = useState(newBurger)

  return (
    <>
      <section className='burger-details'>
        <section>
          <section className='burger-items'>
            <label className={burger.name === 'Smash burger' ? 'active' : ''}>
              Smash burger $10
              <input
                type='radio'
                name='size'
                value='Smash burger'
                onChange={(event) => {
                  setBurger({ ...burger, name: event.target.value })
                }}
              />
            </label>

            <label className={burger.name === 'Double burger' ? 'active' : ''}>
              Double burger $10
              <input
                type='radio'
                name='size'
                value='Double burger'
                onChange={(event) => {
                  setBurger({ ...burger, name: event.target.value })
                }}
              />
            </label>
          </section>

          <section className='burger-items'>
            <label className={burger.flavor === 'Meat' ? 'active' : ''}>
              Meat
              <input
                type='radio'
                name='burger'
                value='Meat'
                onChange={(event) => {
                  setBurger({ ...burger, flavor: event.target.value })
                }}
              />
            </label>

            <label className={burger.flavor === 'Chicken' ? 'active' : ''}>
              Chicken
              <input
                type='radio'
                name='burger'
                value='Chicken'
                onChange={(event) => {
                  setBurger({ ...burger, flavor: event.target.value })
                }}
              />
            </label>

            <label className={burger.flavor === 'Veggie' ? 'active' : ''}>
              Veggie
              <input
                type='radio'
                name='burger'
                value='Veggie'
                onChange={(event) => {
                  setBurger({ ...burger, flavor: event.target.value })
                }}
              />
            </label>
          </section>

          <section className='burger-items'>
            <label className={burger.complement === 'Cheese' ? 'active' : ''}>
              Cheese $1
              <input
                type='radio'
                name='extra'
                value='Cheese'
                onChange={(event) => {
                  setBurger({ ...burger, complement: event.target.value })
                }}
              />
            </label>

            <label className={burger.complement === 'Egg' ? 'active' : ''}>
              Egg $1
              <input
                type='radio'
                name='extra'
                value='Egg'
                onChange={(event) => {
                  setBurger({ ...burger, complement: event.target.value })
                }}
              />
            </label>
          </section>
        </section>
      </section>
      <button
        type='button'
        className='send-button'
        onClick={() => {
          getBurgerId(burger)
        }}
      >
        ADD ITEM
      </button>
    </>
  )
}

Burgers.propTypes = {
  getBurgerId: PropTypes.func.isRequired,
}

export default Burgers
