import React from 'react'
import PropTypes from 'prop-types'
import 'bootstrap/dist/css/bootstrap.css'
import Modal from 'react-bootstrap/Modal'
import ButtonContained from '../../atoms/ButtonContained'
import './Dialog.styles.css'

const Dialog = ({ show, cancelOrder }) => (
  <div className='back'>
    <Modal
      show={show}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Body>
        <p className='modal-text'>Do you really want to delete?</p>
        <section className='modal-bottom'>
          <ButtonContained
            label='YES'
            type='button'
            classStyle='outlined'
            handleClick={() => cancelOrder(true)}
          />
          <ButtonContained
            label='NO'
            type='button'
            classStyle='filled'
            handleClick={() => cancelOrder(false)}
          />
        </section>
      </Modal.Body>
    </Modal>
  </div>
)

Dialog.propTypes = {
  cancelOrder: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
}

export default Dialog
