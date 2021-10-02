import React from 'react'
import PropTypes from 'prop-types'
import 'bootstrap/dist/css/bootstrap.css'
import Modal from 'react-bootstrap/Modal'

const ModalMessage = ({ cancelOrder }) => (
  <div className='back'>
    <Modal size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
      <Modal.Body>
        <p className='modal-text'>Do you really want to delete?</p>
        <section className='modal-bottom'>
          <button
            type='button'
            className='modal-button yes-button'
            onClick={() => cancelOrder(true)}
          >
            YES
          </button>
          <button
            type='button'
            className='modal-button'
            onClick={() => cancelOrder(false)}
          >
            NO
          </button>
        </section>
      </Modal.Body>
    </Modal>
  </div>
)

ModalMessage.propTypes = {
  cancelOrder: PropTypes.func.isRequired,
}

export default ModalMessage
