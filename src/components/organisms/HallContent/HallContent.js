import React, { useEffect, useState } from 'react'
import {
  calculateTotal,
  updateChartItem,
  isOnTheList,
} from '../../../utils/index'
import { productOrder } from '../../../utils/adapter'
import { CallAPI, RequestOptions } from '../../../services/api'
import Dialog from '../../molecules/Dialog'
import Snackbar from '../../molecules/Snackbar'
import Cart from '../Cart'
import Menu from '../Menu'
import './HallContent.styles.css'

const HallContent = () => {
  const { token } = JSON.parse(localStorage.getItem('currentUser'))

  const newOrder = {
    client: '',
    table: '',
    products: [],
  }

  const [order, setOrder] = useState(newOrder)
  const [dialogShow, setDialogShow] = useState(false)
  const [productsChart, setProducts] = useState([])
  const [totalToPay, setTotal] = useState(0)
  const [show, setShow] = useState(false)
  const [errCode, setCode] = useState('')
  const [productsList, setProductsList] = useState([])

  const handleError = (message) => {
    setCode(message)
    setShow(true)
  }

  useEffect(() => {
    setTotal(() => calculateTotal(productsChart))
  }, [productsChart])

  useEffect(() => {
    const requestMethod = RequestOptions.get(token)
    CallAPI('products', requestMethod).then((json) => {
      if (json.code) handleError(String(json.code))
      else setProductsList(json)
    })
  }, [token])

  const addItem = (product) => {
    const productToSet = product
    if (!isOnTheList(productToSet, productsChart)) {
      setProducts((productsState) => [...productsState, productToSet])
    } else {
      setProducts(() => updateChartItem(productToSet, productsChart))
    }
  }

  const deleteProduct = (index) => {
    const products = [...productsChart]
    products.splice(index, 1)
    setProducts(products)
  }

  const handlePlusClick = (index) => {
    const products = [...productsChart]
    products[index].qtd = +products[index].qtd + 1
    setProducts(products)
  }

  const handleMinusClick = (index) => {
    const products = [...productsChart]
    if (products[index].qtd > 1) {
      products[index].qtd = +products[index].qtd - 1
      setProducts(products)
    } else {
      deleteProduct(index)
    }
  }

  const handleRequest = (method) => {
    CallAPI('orders', method).then((json) => {
      if (!json.code) {
        setCode('200')
        setShow(true)
        setOrder(newOrder)
        setProducts([])
      } else {
        handleError(String(json.code))
      }
    })
  }

  const createOrder = (orderObj) => {
    const { client, table, products } = orderObj
    if (!products.length) handleError('003')
    else {
      const requestBody = JSON.stringify({
        client,
        table,
        products: productOrder(products),
      })

      const requestMethod = RequestOptions.postAndAuth(requestBody, token)
      handleRequest(requestMethod)
    }
  }

  const handleCancelOrder = () => {
    setDialogShow(true)
  }

  const cancelOrder = (answer) => {
    setDialogShow(false)
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
    <section className='home'>
      <Menu
        addItem={addItem}
        handleError={handleError}
        productsList={productsList}
      />

      <Cart
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

      <Snackbar code={errCode} onClose={() => setShow(false)} show={show} />
      <Dialog show={dialogShow} cancelOrder={cancelOrder} />
    </section>
  )
}

export default HallContent
