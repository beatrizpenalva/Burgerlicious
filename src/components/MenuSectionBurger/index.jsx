import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BurgerSection = ({ getBurgerId }) => {
  const newBurger = {
    name: '',
    flavor: '',
    complement: '',
    qtd: 1,
  }

  const [burger, setBurger] = useState(newBurger)

  return (
    <>
      <section className='burger-details'>
        <section>
          <section className='burger-items'>
            <label
              htmlFor='burger-smash'
              className={burger.name === 'Smash burger' ? 'active' : ''}
            >
              Smash burger $10
              <input
                id='burger-smash'
                type='radio'
                name='size'
                value='Smash burger'
                onChange={(event) => {
                  setBurger({ ...burger, name: event.target.value })
                }}
              />
            </label>

            <label
              htmlFor='burger-double'
              className={burger.name === 'Double burger' ? 'active' : ''}
            >
              Double burger $10
              <input
                id='burger-double'
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
            <label
              htmlFor='burger-meat'
              className={burger.flavor === 'Meat' ? 'active' : ''}
            >
              Meat
              <input
                id='burger-meat'
                type='radio'
                name='burger'
                value='Meat'
                onChange={(event) => {
                  setBurger({ ...burger, flavor: event.target.value })
                }}
              />
            </label>

            <label
              htmlFor='burger-chicken'
              className={burger.flavor === 'Chicken' ? 'active' : ''}
            >
              Chicken
              <input
                id='burger-chicken'
                type='radio'
                name='burger'
                value='Chicken'
                onChange={(event) => {
                  setBurger({ ...burger, flavor: event.target.value })
                }}
              />
            </label>

            <label
              htmlFor='burger-veggie'
              className={burger.flavor === 'Veggie' ? 'active' : ''}
            >
              Veggie
              <input
                id='burger-veggie'
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
            <label
              htmlFor='burger-cheese'
              className={burger.complement === 'Cheese' ? 'active' : ''}
            >
              Cheese $1
              <input
                id='burger-cheese'
                type='radio'
                name='extra'
                value='Cheese'
                onChange={(event) => {
                  setBurger({ ...burger, complement: event.target.value })
                }}
              />
            </label>

            <label
              htmlFor='burger-egg'
              className={burger.complement === 'Egg' ? 'active' : ''}
            >
              Egg $1
              <input
                id='burger-egg'
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

BurgerSection.propTypes = {
  getBurgerId: PropTypes.func.isRequired,
}

export default BurgerSection
