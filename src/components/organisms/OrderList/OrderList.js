import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { CallAPI, RequestOptions } from '../../../services/api'
import {
  filterOrder,
  filterOrderByTwoConditions,
  getCurrentUser,
} from '../../../utils/index'
import { translatePTtoEN } from '../../../utils/adapter'
import ButtonCard from '../../atoms/ButtonCard'
import Card from '../../molecules/Card'
import Dialog from '../../molecules/Dialog'
import Snackbar from '../../molecules/Snackbar'
import './OrderList.styles.css'

const OrderList = ({ filterType }) => {
  const { token, role } = getCurrentUser

  const [orders, setOrders] = useState([])
  const [ordersFiltered, setOrderFiltered] = useState([])
  const [ordersFinished, setOrdersFinished] = useState([])
  const [orderToDelete, setOrderToDelete] = useState({})
  const [show, setShow] = useState(false)
  const [errCode, setCode] = useState('')
  const [dialogShow, setDialogShow] = useState(false)

  const handleError = (code) => {
    setCode(code)
    setShow(true)
  }

  const getRenderScenario = (array) => {
    const ordersList = array
    if (role === 'kitchen')
      return filterOrderByTwoConditions(ordersList, 'doing', 'pending')
    if (role === 'hall')
      return filterOrderByTwoConditions(ordersList, 'done', 'pending')
    return null
  }

  useEffect(() => {
    const translateOrders = (array) => {
      const dataTranslated = array.map((order) => {
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
      setOrders(dataTranslated)
      setOrderFiltered(getRenderScenario(dataTranslated))
      setOrdersFinished(filterOrder(dataTranslated, 'finished'))
    }

    const requestMethod = RequestOptions.get(token)
    CallAPI('orders', requestMethod).then((json) => {
      if (json.code) handleError(String(json.code))
      else translateOrders(json)
    })
  }, [])

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
    // { index, id, orderStatus } = orderToDelete
    setDialogShow(false)
    if (orderToDelete.orderStatus === 'pending') {
      const requestMethod = RequestOptions.delete(token)
      CallAPI(`getOneOrder${orderToDelete.id}`, requestMethod).then((json) => {
        if (!json.code) {
          const newOrders = [...orders]
          newOrders.splice(orderToDelete.index, 1)
          setOrders(newOrders)
        } else handleError(String(json.code))
      })
    }
  }

  const handleSuccessRequest = (index, json) => {
    const newOrders = [...orders]
    newOrders.splice(index, 1, json)
    setOrders(newOrders)
  }

  const getOrderNextStep = {
    pending: 'doing',
    doing: 'done',
    done: 'finished',
  }

  const handleClick = (index, id, status) => {
    if (status === 'pending' && role === 'hall') handleDelete(index, id, status)
    else {
      const URL = `getOneOrder${id}`
      const requestMethod = RequestOptions.put(token, getOrderNextStep[status])

      CallAPI(URL, requestMethod).then((json) => {
        if (!json.code) handleSuccessRequest(index, json)
        else handleError(String(json.code))
      })
    }
  }

  const getOrderStatus = (status) => {
    if (role === 'hall' && status === 'pending') return 'delete'
    return getOrderNextStep[status]
  }

  const renderScenario = filterType ? ordersFinished : ordersFiltered

  return (
    <>
      {renderScenario &&
        renderScenario
          .sort((a, b) => (a.id > b.id ? 1 : -1))
          .map((item, index) => (
            <div key={item.id} className='card-template'>
              <Card order={item} />

              {item.status !== 'finished' && (
                <ButtonCard
                  onClick={() => handleClick(index, item.id, item.status)}
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
  filterType: PropTypes.string,
}

OrderList.defaultProps = {
  filterType: '',
}

export default OrderList
