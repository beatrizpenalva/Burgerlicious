import React, { useEffect, useState } from 'react'
import Order from '../Order'
import ToastGroup from '../Toast'
import CallAPI from '../../services/api'
import ModalMessage from '../Modal'
import MenuEmSi from '../MenuEmSi'

const HallContent = () => {
  const nameLS = JSON.parse(localStorage.getItem('currentUser'))
  const { token } = nameLS

  const newOrder = {
    client: ' ',
    table: ' ',
    products: [],
  }

  const [order, setOrder] = useState(newOrder)
  const [modalShow, setModalShow] = useState(false)
  const [productsChart, setProducts] = useState([])
  const [totalToPay, setTotal] = useState(0)
  const [show, setShow] = useState(false)
  const [errCode, setCode] = useState('')

  useEffect(() => {
    setTotal(() => {
      const newTotal = productsChart.reduce((accumulator, current) => {
        const { quantity, price } = current
        accumulator = Number(quantity * price + accumulator)
        return accumulator
      }, 0)

      return newTotal
    })
  }, [productsChart])

  const addItem = (product) => {
    const productToSet = product
    const isOnTheList = productsChart.some(
      (item) => item.id === productToSet.id
    )

    if (!isOnTheList) {
      setProducts((productsState) => [...productsState, productToSet])
    } else {
      const newQuantity = productToSet.quantity
      const itemUptaded = productsChart.map((i) => {
        if (i.id === productToSet.id) {
          i.quantity += newQuantity
        }
        return i
      })
      setProducts(() => itemUptaded)
    }
  }

  const deleteProduct = (index) => {
    const getProductsArray = [...productsChart]
    getProductsArray.splice(index, 1)
    setProducts(getProductsArray)
  }

  const handlePlusClick = (index) => {
    const productsList = [...productsChart]
    productsList[index].quantity = +productsList[index].quantity + 1
    setProducts(productsList)
  }

  const handleMinusClick = (index) => {
    const productsList = [...productsChart]
    if (productsList[index].quantity > 1) {
      productsList[index].quantity = +productsList[index].quantity - 1
      setProducts(productsList)
    } else {
      deleteProduct(index)
    }
  }

  const handleError = (message) => {
    setCode(message)
    setShow(true)
  }

  const cancelOrder = (answer) => {
    setModalShow(false)
    if (answer === true) {
      setOrder(newOrder)
      setProducts([])
      if (productsChart.length !== 0) {
        setCode('002')
        setShow(true)
      }
    }
  }

  const createOrder = (orderObj) => {
    const { client, table, products } = orderObj
    if (products.length === 0) {
      handleError('003')
    } else {
      const listItemsOrder = products.map((item) => ({
        id: item.id,
        qtd: item.quantity,
      }))

      const body = JSON.stringify({
        client,
        table,
        products: listItemsOrder,
      })

      CallAPI('https://lab-api-bq.herokuapp.com/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
          Authorization: token,
        },
        body,
      }).then((json) => {
        if (!json.code) {
          setCode('200')
          setShow(true)
          setOrder(newOrder)
          setProducts([])
        } else {
          setCode(String(json.code))
          setShow(true)
        }
      })
    }
  }

  const handleSendOrder = (event) => {
    event.preventDefault()
    const productsList = [...productsChart]
    const updateOrder = { ...order, products: productsList }
    setOrder(updateOrder)
    createOrder(updateOrder)
  }

  const handleCancel = () => {
    setModalShow(true)
  }

  const handleOrderChange = (event, key) => {
    if (key === 'client') setOrder({ ...order, client: event.target.value })
    else setOrder({ ...order, table: event.target.value })
  }

  return (
    <>
      <MenuEmSi addItem={addItem} handleError={handleError} />

      <Order
        totalToPay={totalToPay}
        handleMinusClick={handleMinusClick}
        handlePlusClick={handlePlusClick}
        handleError={handleError}
        cancelOrder={cancelOrder}
        createOrder={createOrder}
        deleteProduct={deleteProduct}
        handleSendOrder={handleSendOrder}
        handleCancel={handleCancel}
        order={order}
        productsChart={productsChart}
        handleOrderChange={handleOrderChange}
      />

      <ToastGroup code={errCode} onClose={() => setShow(false)} show={show} />
      <ModalMessage show={modalShow} cancelOrder={cancelOrder} />
    </>
  )
}

export default HallContent
