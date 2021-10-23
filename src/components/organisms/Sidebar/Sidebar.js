import React from 'react'
import PropTypes from 'prop-types'
import ButtonText from '../../atoms/ButtonText'
import OrderList from '../OrderList'
import './Sidebar.styles.css'

const Sidebar = ({ filterType, title, onClose }) => (
  <section className='open'>
    <div className='overlay-dark' />
    <div className='sidebar'>
      <div>
        <section>
          <ButtonText label='X' handleClick={() => onClose(false)} />
        </section>
      </div>
      <div className='sidebar-container'>
        <div>
          <h2 className='title-sidebar'>{title}</h2>
          <section>
            <OrderList filterType={filterType} />
          </section>
        </div>
      </div>
    </div>
  </section>
)

Sidebar.propTypes = {
  filterType: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default Sidebar
