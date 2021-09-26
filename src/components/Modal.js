/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import Modal from 'react-bootstrap/Modal'

const ModalMessage = (props) => (
  <div className='back'>
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Body>
        <p className='modal-text'>Do you really want to delete?</p>
        <section className='modal-bottom'>
          <button
            type='button'
            className='modal-button yes-button'
            onClick={() => props.cancelOrder(true)}
          >
            YES
          </button>
          <button
            type='button'
            className='modal-button'
            onClick={() => props.cancelOrder(false)}
          >
            NO
          </button>
        </section>
      </Modal.Body>
    </Modal>
  </div>
)

export default ModalMessage
