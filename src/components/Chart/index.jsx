import React from 'react'
import PropTypes from 'prop-types'

const Chart = ({
  productsChart,
  handleMinusClick,
  handlePlusClick,
  deleteProduct,
}) => (
  <section className='products-info'>
    {productsChart.map((item, index) => (
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
            <p className='quantity-field'>{item.qtd}</p>
            <button
              type='button'
              className='count-button'
              onClick={() => item.qtd > 0 && handleMinusClick(index)}
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
    ))}
  </section>
)

Chart.propTypes = {
  productsChart: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleMinusClick: PropTypes.func.isRequired,
  handlePlusClick: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
}

export default Chart
