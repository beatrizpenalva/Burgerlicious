import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ButtonContained from '../atoms/ButtonContained'

const Items = ({ list, createItemObject }) => {
  const [items, setItems] = useState({})

  function callCreate(array) {
    array.map((arr) => createItemObject(arr[0], arr[1]))
  }

  const handleClick = () => {
    const getEntries = Object.entries(items)
    callCreate(getEntries)
    setItems({})
  }

  const handlePlusClick = (item, count) => {
    setItems({ ...items, [item.id]: count + 1 })
  }

  const handleMinusClick = (item, count) => {
    if (count > 0) setItems({ ...items, [item.id]: count - 1 })
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
                    onClick={() => handlePlusClick(item, count)}
                  >
                    {' '}
                    +{' '}
                  </button>
                  <p className='quantity-field'>{count}</p>
                  <button
                    type='button'
                    className='count-button'
                    onClick={() => handleMinusClick(item, count)}
                  >
                    {' '}
                    -{' '}
                  </button>
                </section>
              </section>
            )
          })}
      </section>

      <ButtonContained
        label='ADD ITEM'
        handleClick={handleClick}
        classStyle='filled'
        type='button'
      />
    </>
  )
}

Items.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  createItemObject: PropTypes.func.isRequired,
}

export default Items
