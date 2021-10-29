import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { CallAPI, RequestOptions } from '../../../services/api'
import { translatePTtoEN } from '../../../utils/adapter'
import ButtonCard from '../../atoms/ButtonCard'
import Card from '../../molecules/Card'
import Dialog from '../../molecules/Dialog'
import Snackbar from '../../molecules/Snackbar'
import './OrderList.styles.css'

const OrderList = ({ filterType }) => {
  const { token, role } = JSON.parse(localStorage.getItem('currentUser'))
  const type = filterType

  const [allOrders, setAllOrders] = useState([])
  const [ordersTranslated, setOrdersTranslated] = useState([])
  const [orderlist, setOrderlist] = useState([])
  const [ordertToDelete, setOrderToDelete] = useState({})
  const [show, setShow] = useState(false)
  const [errCode, setCode] = useState('')
  const [dialogShow, setDialogShow] = useState(false)

  const handleError = (code) => {
    setCode(code)
    setShow(true)
  }

  useEffect(() => {
    const requestMethod = RequestOptions.get(token)
    CallAPI('orders', requestMethod).then((json) => {
      if (json.code) handleError(String(json.code))
      else setAllOrders(json)
    })
  }, [token])

  useEffect(() => {
    if (!allOrders) return

    const dataTranslated = allOrders.map((order) => {
      const translatedProducts = order.Products.map((item) => ({
        ...item,
        name: translatePTtoEN[item.name],
        flavor: translatePTtoEN[item.flavor],
        complement: translatePTtoEN[item.complement],
      }))

      return {
        ...order,
        Products: translatedProducts,
      }
    })

    setOrdersTranslated(dataTranslated)
  }, [allOrders])

  const getFilter = {
    cooking(status) {
      return status !== 'finished' && status !== 'done'
    },
    readyToServe(status) {
      return status !== 'finished'
    },
    finished(status) {
      return status === 'finished'
    },
  }

  const filterOrders = (orderStatus) => {
    const orderFiltered = ordersTranslated.filter(({ status }) =>
      getFilter[orderStatus](status)
    )
    setOrderlist(orderFiltered)
  }

  useEffect(() => {
    if (!ordersTranslated) return
    if (role === 'kitchen') filterOrders('cooking')
    else if (role === 'hall' && type === 'processing')
      filterOrders('readyToServe')
    else if (type === 'finished') filterOrders('finished')
  }, [ordersTranslated])

  const handleDelete = (index, id, orderStatus) => {
    setDialogShow(true)
    const order = {
      index,
      id,
      orderStatus,
    }
    setOrderToDelete(order)
  }

  const cancelOrder = () => {
    { index, id, orderStatus } = ordertToDelete
    setDialogShow(false)
    // e o else daqui?
    if (orderStatus === 'pending') {
      const requestMethod = RequestOptions.delete(token)
      CallAPI(`getOneOrder${id}`, requestMethod).then((json) => {
        if (!json.code) {
          const newOrders = [...orderlist]
          newOrders.splice(index, 1)
          setOrderlist(newOrders)
        } else handleError(String(json.code))
      })
    }
  }

  const handleSuccessRequest = (index, json) => {
    const newOrders = [...orderlist]
    newOrders.splice(index, 1, json)
    setOrderlist(newOrders)
  }

  const handleUpdateStatus = (index, id, status) => {
    const URL = `getOneOrder${id}`
    const requestMethod = RequestOptions.put(token, getOrderNextStep[status])

    CallAPI(URL, requestMethod).then((json) => {
      if (!json.code) handleSuccessRequest(index, json)
      else handleError(String(json.code))
    })
  }

  const getOrderNextStep = {
    pending: 'doing',
    doing: 'done',
    done: 'finished',
  }

  const getOrderStatus = (status) => {
    if (role === 'hall' && status === 'pending') return 'delete'
    return getKitchenButtonLabel[status]
  }

  return (
    <>
      {orderlist &&
        orderlist
          .sort((a, b) => (a.id > b.id ? 1 : -1))
          .map((item, index) => (
            <div key={item.id} className='card-template'>
              <Card order={item} />

              {pending && item.status !== 'finished' && (
                <ButtonCard
                  onClick={() => handleUpdateStatus(index, item.id, item.status)}
                  label={getOrderStatus(item.status)}
                  classStyle={getOrderStatus(item.status)}
                />
              )}

              {done && item.status === 'done' && (
                <ButtonCard
                  onClick={() => handleUpdateStatus(index, item.id, item.status)}
                  label={getOrderStatus(item.status)}
                  className={getOrderStatus(item.status)}
                />
              )}

              {done && item.status === 'pending' && role === 'hall' && (
                <ButtonCard
                  onClick={() => handleDelete(index, item.id, item.status)}
                  label={getOrderStatus(item.status)}
                  classStyle={getOrderStatus(item.status)}
                />
              )}
            </div>
          ))}

      <Snackbar code={errCode} onClose={() => setShow(false)} show={show} />
      <Dialog show={dialogShow} cancelOrder={cancelOrder} />
    </>
  )
}

OrderList.propTypes = {
  filterType: PropTypes.string.isRequired,
}

export default OrderList
