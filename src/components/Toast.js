/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import Toast from 'react-bootstrap/Toast'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const ToastGroup = (props) => {
  const verifyErrorCode = {
    '001': 'You have to chose a burger option. Please, try again.',
    '002': 'Order canceled!',
    '003': 'There is nothing to order. Please, chose the products.',
    200: 'Order sent to the kitchen succesfully!',
    400: 'Missing required data or no changes applied. Please, try again.',
    401: 'User not authenticated. Please, sign in and try again.',
    403: 'Order belongs to another restaurant. Please, try with a different info.',
    404: 'Ops! Something went wrong. Please, try again.',
  }

  let errorMessage = verifyErrorCode[props.code]

  if (!errorMessage) {
    errorMessage = 'Ops! Something went wrong. Please, try again.'
  }

  return (
    <Row>
      <Col xs={6}>
        <Toast show={props.show} onClose={props.onClose}>
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

export default ToastGroup
