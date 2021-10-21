import React from 'react'
import { useHistory } from 'react-router-dom'
import Header from '../../components/Header'
import OrderList from '../../components/organisms/OrderList'
import Footer from '../../components/Footer/index'

const Kitchen = () => {
  const nameLS = JSON.parse(localStorage.getItem('currentUser'))
  const { name, role } = nameLS
  const history = useHistory()

  if (role !== 'kitchen') {
    history.push('/')
    return null
  }
  return (
    <section>
      <Header role={role} name={name} />
      <section className='container-cards'>
        <OrderList />
      </section>
      <Footer />
    </section>
  )
}

export default Kitchen
