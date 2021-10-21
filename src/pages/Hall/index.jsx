import React from 'react'
import Header from '../../components/organisms/Header'
import Footer from '../../components/Footer/index'
import HallContent from '../../components/HallContent/index'

const Hall = () => {
  const nameLS = JSON.parse(localStorage.getItem('currentUser'))

  return (
    <>
      <Header role={nameLS.role} name={nameLS.name} />

      <main className='home'>
        <section className='menu-details'>
          <HallContent />
        </section>
      </main>

      <Footer />
    </>
  )
}

export default Hall
