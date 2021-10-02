import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import Spinner from 'react-bootstrap/Spinner'

const Loading = () => (
  <Spinner animation='border' role='status'>
    <span className='sr-only'>Loading...</span>
  </Spinner>
)

export default Loading
