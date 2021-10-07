import React from 'react'
import PropTypes from 'prop-types'
import Chart from '../Chart/index'

const Order = ({
  totalToPay,
  handleMinusClick,
  handlePlusClick,
  deleteProduct,
  handleSendOrder,
  handleCancel,
  productsChart,
  order,
  handleOrderChange,
}) => (
  <form className='order-summary' onSubmit={(event) => handleSendOrder(event)}>
    <section className='client-info'>
      <label htmlFor='client-name'>
        Client:
        <input
          id='client-name'
          type='text'
          placeholder='Client name'
          className='form-input'
          value={order.client}
          onChange={(event) => handleOrderChange(event, 'client')}
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
          value={order.table}
          onChange={(event) => handleOrderChange(event, 'table')}
          required
        />
      </label>
    </section>

    {productsChart.length > 0 && (
      <Chart
        handleMinusClick={handleMinusClick}
        handlePlusClick={handlePlusClick}
        deleteProduct={deleteProduct}
        productsChart={productsChart}
      />
    )}

    <section className='bottom-section'>
      <p className='total-price'>
        {' '}
        TOTAL PRICE: <span className='total-value'>${totalToPay}</span>
      </p>
      <section className='order-button-section'>
        <button
          type='button'
          className='cancel-button'
          onClick={() => handleCancel()}
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

Order.propTypes = {
  totalToPay: PropTypes.number.isRequired,
  handleMinusClick: PropTypes.func.isRequired,
  handlePlusClick: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
  handleSendOrder: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleOrderChange: PropTypes.func.isRequired,
  order: PropTypes.exact({
    client: PropTypes.string,
    table: PropTypes.string,
    products: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  productsChart: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default Order
