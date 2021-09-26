/* eslint-disable prettier/prettier */
import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Menu from '../../components/Menu'

const Hall = () => {
  const nameLS = JSON.parse(localStorage.getItem('currentUser'))

  return (
    <>
      <Header role={nameLS.role} name={nameLS.name} />

      <main className='home'>
        <section className='menu-details'>
          <Menu />
        </section>
      </main>

      <Footer />
    </>
  )
}

export default Hall
