/* eslint-disable prettier/prettier */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Itens = ({ list, createItemObject }) => {
  const [items, setItems] = useState({})

  const handleClick = (elements) => {
    for (const property in elements) {
      createItemObject(property, elements[property])
    }
    setItems({})
  }

  return (
    <>
      <section className='menu-description'>
        {list.length &&
          list.map((item) => {
            let count

            if (items[item.id]) count = items[item.id]
            else count = 0

            return (
              <section className='item-description' key={item.name}>
                <p className='product'>{item.name}</p>
                <p className='price'>${item.price}</p>
                <section className='input-group'>
                  <button
                    type='button'
                    className='count-button'
                    onClick={() => setItems({ ...items, [item.id]: count + 1 })}
                  >
                    {' '}
                    +{' '}
                  </button>
                  <p className='quantity-field'>{count}</p>
                  <button
                    type='button'
                    className='count-button'
                    onClick={() =>
                      count > 0 && setItems({ ...items, [item.id]: count - 1 })
                    }
                  >
                    {' '}
                    -{' '}
                  </button>
                </section>
              </section>
            )
          })}
      </section>
      <button
        type='button'
        className='send-button'
        onClick={() => handleClick(items)}
      >
        ADD ITEM
      </button>
    </>
  )
}

Itens.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  createItemObject: PropTypes.func.isRequired,
}

export default Itens
