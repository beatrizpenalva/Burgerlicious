import React from 'react'
import { useHistory } from 'react-router-dom'
import Header from '../../organisms/Header'
import OrderList from '../../organisms/OrderList'
import Footer from '../../molecules/Footer'

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
      <OrderList />
      <Footer />
    </section>
  )
}

export default Kitchen
