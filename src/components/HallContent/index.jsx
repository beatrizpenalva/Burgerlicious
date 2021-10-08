import React, { useEffect, useState } from 'react'
import Order from '../Order/index'
import ToastGroup from '../Toast'
import CallAPI from '../../services/api'
import ModalMessage from '../Modal'
import Menu from '../Menu/index'
import {
  calculateTotal,
  updateChartItem,
  isOnTheList,
  listItemsOrder,
} from '../../utils/index'

const HallContent = () => {
  const nameLS = JSON.parse(localStorage.getItem('currentUser'))
  const { token } = nameLS

  const newOrder = {
    client: '',
    table: '',
    products: [],
  }

  const [order, setOrder] = useState(newOrder)
  const [modalShow, setModalShow] = useState(false)
  const [productsChart, setProducts] = useState([])
  const [totalToPay, setTotal] = useState(0)
  const [show, setShow] = useState(false)
  const [errCode, setCode] = useState('')

  useEffect(() => {
    setTotal(() => calculateTotal(productsChart))
  }, [productsChart])

  const addItem = (product) => {
    const productToSet = product
    if (!isOnTheList(productToSet, productsChart)) {
      setProducts((productsState) => [...productsState, productToSet])
    } else {
      setProducts(() => updateChartItem(productToSet, productsChart))
    }
  }

  const deleteProduct = (index) => {
    const productsList = [...productsChart]
    productsList.splice(index, 1)
    setProducts(productsList)
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

  const createOrder = (orderObj) => {
    const { client, table, products } = orderObj
    if (products.length === 0) {
      handleError('003')
    } else {
      const body = JSON.stringify({
        client,
        table,
        products: listItemsOrder(products),
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
          // eslint-disable-next-line no-console
          console.log('entrou aqui')
        } else {
          setCode(String(json.code))
          setShow(true)
        }
      })
    }
  }

  const handleCancelOrder = () => {
    setModalShow(true)
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

  const handleOrderChange = (event, key) => {
    if (key === 'client') setOrder({ ...order, client: event.target.value })
    else setOrder({ ...order, table: event.target.value })
  }

  const handleSendOrder = (event) => {
    event.preventDefault()
    const orderUptaded = { ...order, products: [...productsChart] }
    setOrder(orderUptaded)
    createOrder(orderUptaded)
  }

  return (
    <>
      <Menu addItem={addItem} handleError={handleError} />

      <Order
        order={order}
        productsChart={productsChart}
        totalToPay={totalToPay}
        handleMinusClick={handleMinusClick}
        handlePlusClick={handlePlusClick}
        handleError={handleError}
        createOrder={createOrder}
        deleteProduct={deleteProduct}
        handleOrderChange={handleOrderChange}
        handleSendOrder={handleSendOrder}
        handleCancelOrder={handleCancelOrder}
        cancelOrder={cancelOrder}
      />

      <ToastGroup code={errCode} onClose={() => setShow(false)} show={show} />
      <ModalMessage show={modalShow} cancelOrder={cancelOrder} />
    </>
  )
}

export default HallContent
