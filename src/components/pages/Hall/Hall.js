import React from 'react'
import Header from '../../organisms/Header'
import Footer from '../../molecules/Footer'
import HallContent from '../../organisms/HallContent'

const Hall = () => {
  const nameLS = JSON.parse(localStorage.getItem('currentUser'))

  return (
    <>
      <Header role={nameLS.role} name={nameLS.name} />
      <HallContent />
      <Footer />
    </>
  )
}

export default Hall
