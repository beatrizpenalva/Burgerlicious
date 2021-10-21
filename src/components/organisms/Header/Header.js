import React from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import logo from '../../../img/logo.png'
import ButtonSidebar from '../../Buttonsidebar'
import ButtonContained from '../../atoms/ButtonContained'

const Header = ({ role, name }) => {
  const nameFunction = () => {
    if (role === 'hall') return 'Attendant'
    return 'Chef'
  }

  const history = useHistory()

  return (
    <>
      <header>
        <section>
          <div className='user-info'>
            <span className='team-work'>{nameFunction().toUpperCase()}:</span>{' '}
            {name.toUpperCase()}
          </div>
          <ButtonContained
            onClick={() => {
              history.push('/')
              localStorage.clear()
            }}
          >
            <span className='material-icons'>logout</span>
            <span className='button-text'>LOGOUT</span>
          </ButtonContained>
        </section>

        <img
          className='logo'
          src={logo}
          alt='logo'
          height='116px'
          width='141,6px'
        />

        <section className='buttons'>
          {role === 'kitchen' && (
            <ButtonContained
              value='refresh'
              id='refresh'
              onClick={() => window.location.reload()}
            >
              <span className='material-icons'>notifications</span>
              <span className='button-text'>UPDATE ORDERS</span>
            </ButtonContained>
          )}

          {role === 'hall' && (
            <ButtonSidebar value='ORDERS IN PROGRESS' id='processing'>
              <span className='material-icons'>notifications</span>
              <span className='button-text'>ORDERS IN PROGRESS</span>
            </ButtonSidebar>
          )}

          <ButtonSidebar value='FINISHED ORDERS' id='finished'>
            <span className='material-icons'>history</span>
            <span className='button-text'>FINISHED ORDERS</span>
          </ButtonSidebar>
        </section>
      </header>
    </>
  )
}

Header.propTypes = {
  role: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

export default Header
