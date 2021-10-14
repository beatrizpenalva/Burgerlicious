import React from 'react'
import PropTypes from 'prop-types'
import 'bootstrap/dist/css/bootstrap.css'
import Toast from 'react-bootstrap/Toast'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { verifyErrorCode } from '../../utils/adapter'

const ToastGroup = ({ code, show, onClose }) => {
  let errorMessage = verifyErrorCode[code]

  if (!errorMessage) {
    errorMessage = 'Ops! Something went wrong. Please, try again.'
  }

  return (
    <Row>
      <Col xs={6}>
        <Toast show={show} onClose={onClose}>
          <Toast.Header>
            <img
              src='holder.js/20x20?text=%20'
              className='rounded mr-2'
              alt=''
            />
            <strong className='mr-auto'>Burgerlicious says:</strong>
          </Toast.Header>
          <Toast.Body>{errorMessage}</Toast.Body>
        </Toast>
      </Col>
    </Row>
  )
}

ToastGroup.propTypes = {
  code: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default ToastGroup
