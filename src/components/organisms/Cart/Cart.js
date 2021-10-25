import React from 'react'
import PropTypes from 'prop-types'
import ButtonContained from '../../atoms/ButtonContained'
import ButtonText from '../../atoms/ButtonText'
import TextField from '../../atoms/TextField'
import './Cart.styles.css'

const Cart = ({
  totalToPay,
  handleMinusClick,
  handlePlusClick,
  deleteProduct,
  handleSendOrder,
  handleCancelOrder,
  productsChart,
  order,
  handleOrderChange,
}) => {
  const getIconLabel = () => <span className='material-icons'>delete</span>

  return (
    <form
      className='order-summary'
      onSubmit={(event) => handleSendOrder(event)}
    >
      <section className='client-info'>
        <TextField
          label='Client:'
          type='text'
          placeholder='Type here the client name'
          value={order.client}
          handleChange={(e) => handleOrderChange(e, 'client')}
          required
        />

        <TextField
          label='Table:'
          type='text'
          placeholder='1-30'
          value={order.table}
          handleChange={(e) => handleOrderChange(e, 'table')}
          required
        />
      </section>

      {productsChart.length > 0 && (
        <section className='products-info'>
          {productsChart.map(({ id, name, flavor, complement, qtd }, index) => (
            <section key={id}>
              <section className='item-description list-items'>
                <ButtonText
                  label={getIconLabel()}
                  handleClick={() => deleteProduct(index)}
                />
                <p className='product'>{name}</p>
                <section className='input-group'>
                  <ButtonText
                    label='+'
                    handleClick={() => handlePlusClick(index)}
                  />
                  <p className='quantity-field'>{qtd}</p>
                  <ButtonText
                    label='-'
                    handleClick={() => handleMinusClick(index)}
                  />
                </section>
              </section>
              <p className='product burger-info'>
                {flavor} {complement}
              </p>
            </section>
          ))}
        </section>
      )}

      <section className='bottom-section'>
        <p className='total-price'>
          {' '}
          TOTAL PRICE: <span className='total-value'>${totalToPay}</span>
        </p>
        <section className='order-button-section'>
          <ButtonContained
            type='submit'
            classStyle='filled'
            label='SEND'
            handleClick={handleSendOrder}
          />

          <ButtonContained
            type='button'
            classStyle='outlined'
            label='CANCEL'
            handleClick={handleCancelOrder}
          />
        </section>
      </section>
    </form>
  )
}

Cart.propTypes = {
  totalToPay: PropTypes.number.isRequired,
  handleMinusClick: PropTypes.func.isRequired,
  handlePlusClick: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
  handleSendOrder: PropTypes.func.isRequired,
  handleCancelOrder: PropTypes.func.isRequired,
  handleOrderChange: PropTypes.func.isRequired,
  order: PropTypes.exact({
    client: PropTypes.string,
    table: PropTypes.string,
    products: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  productsChart: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default Cart
