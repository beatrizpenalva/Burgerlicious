/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Order = ({
  totalToPay,
  handleMinusClick,
  handlePlusClick,
  deleteProduct,
  handleSendOrder,
  handleCancel,
  products,
}) => {
  const [info, setInfo] = useState({
    client: '',
    table: '',
  })

  return (
    <form
      className='order-summary'
      onSubmit={(event) => handleSendOrder(event)}
    >
      <section className='client-info'>
        <label htmlFor='client-name'>
          Client:
          <input
            id='client-name'
            type='text'
            placeholder='Client name'
            className='form-input'
            value={info.client}
            onChange={(event) => {
              setInfo({ ...info, client: event.target.value })
            }}
            required
          />
        </label>

        <label htmlFor='table'>
          Table:
          <input
            id='table'
            type='number'
            placeholder='Table number'
            className='form-input'
            min='1'
            max='30'
            value={info.table}
            onChange={(event) => {
              setInfo({ ...info, table: event.target.value })
            }}
            required
          />
        </label>
      </section>

      <section className='products-info'>
        {products.length > 0 &&
          products.map((item, index) => {
            if (item.quantity > 0) {
              return (
                <section key={item.id}>
                  <section className='item-description list-items'>
                    <button
                      type='button'
                      className='delete-item'
                      onClick={() => deleteProduct(index)}
                    >
                      <span className='material-icons'>delete</span>
                    </button>
                    <p className='product'>{item.name}</p>
                    <section className='input-group'>
                      <button
                        type='button'
                        className='count-button'
                        onClick={() => handlePlusClick(index)}
                      >
                        {' '}
                        +{' '}
                      </button>
                      <p className='quantity-field'>{item.quantity}</p>
                      <button
                        type='button'
                        className='count-button'
                        onClick={() =>
                          item.quantity > 0 && handleMinusClick(index)
                        }
                      >
                        {' '}
                        -{' '}
                      </button>
                    </section>
                  </section>
                  <p className='product burger-info'>
                    {item.flavor} {item.complement}
                  </p>
                </section>
              )
            }
          })}
      </section>

      <section className='bottom-section'>
        <p className='total-price'>
          {' '}
          TOTAL PRICE: <span className='total-value'>${totalToPay}</span>
        </p>
        <section className='order-button-section'>
          <button
            type='button'
            className='cancel-button'
            onClick={(event) => handleCancel(event)}
          >
            CANCEL{' '}
          </button>
          <button type='submit' className='form-order'>
            {' '}
            SEND{' '}
          </button>
        </section>
      </section>
    </form>
  )
}

Order.propTypes = {
  totalToPay: PropTypes.number.isRequired,
  handleMinusClick: PropTypes.func.isRequired,
  handlePlusClick: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
  handleSendOrder: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  order: PropTypes.exact({
    client: PropTypes.string,
    table: PropTypes.string,
    products: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default Order
