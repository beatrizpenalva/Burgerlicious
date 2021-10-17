import React, { useState, useEffect } from 'react'
import RequestOptions from './object/requestOptions'
import CallAPI from '../services/api'
import useFetch from '../services/Hooks/useFetch'
import ToastGroup from './Toast/index'
import ModalMessage from './Modal/index'
import { translatePTtoEN } from '../utils/adapter'
import Card from './molecules/Card'
import ButtonCard from './atoms/ButtonCard'

function ListOrders({ filterType }) {
  const nameLS = JSON.parse(localStorage.getItem('currentUser'))
  const { token, role } = nameLS
  const type = filterType

  const { data, request } = useFetch()
  const [dataTranslated, setDataTranslated] = useState([])
  const [pending, setPending] = useState(null)
  const [done, setDone] = useState(null)
  const [finish, setFinish] = useState(null)
  const [orderlist, setOrderlist] = useState(null)

  const [show, setShow] = useState(false)
  const [errCode, setCode] = useState('')
  const [modalShow, setModalShow] = useState(false)
  const [deleteID, setDeleteID] = useState(null)
  const [deleteIndex, setDeleteIndex] = useState(null)
  const [deleteStatus, setDeleteStatus] = useState(null)

  useEffect(() => {
    async function fetchOrders() {
      const method = RequestOptions.getAndDelete('GET', token)
      const URL = 'https://lab-api-bq.herokuapp.com/orders  '
      await request(URL, method)
    }
    fetchOrders()
  }, [request, token])

  useEffect(() => {
    if (!data) return

    const allOrders = data

    const ordersTranslated = allOrders.map((order) => {
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

    setDataTranslated(ordersTranslated)
  }, [data])

  useEffect(() => {
    if (!dataTranslated) return

    if (role === 'kitchen') {
      const orderPending = dataTranslated.filter(
        ({ status }) => status !== 'done' && status !== 'finished'
      )
      setPending(orderPending)
    }

    if (role === 'hall' && type === 'processing') {
      const orderDone = dataTranslated.filter(
        ({ status }) => status !== 'finished'
      )
      setDone(orderDone)
    }

    if (type === 'finished') {
      const orderDone = dataTranslated.filter(
        ({ status }) => status === 'finished'
      )
      setFinish(orderDone)
    }
  }, [data, dataTranslated, role, type])

  useEffect(() => {
    if (!dataTranslated) return

    if (pending) {
      setOrderlist(pending)
    }
    if (done) {
      setOrderlist(done)
    }
    if (finish) {
      setOrderlist(finish)
    }
  }, [dataTranslated, done, finish, pending])

  const cancelOrder = (answer) => {
    setModalShow(false)
    if (answer === true) {
      if (deleteStatus === 'pending') {
        const method = RequestOptions.getAndDelete('DELETE', token)
        const URL = `https://lab-api-bq.herokuapp.com/orders/${deleteID}  `
        CallAPI(URL, method).then((json) => {
          if (!json.code) {
            const newOrders = [...orderlist]
            newOrders.splice(deleteIndex, 1)
            setOrderlist(newOrders)
          } else {
            setCode(String(json.code))
            setShow(true)
          }
        })
      }
    }
  }

  const handleStatus = (index, id, status) => {
    const URL = `https://lab-api-bq.herokuapp.com/orders/${id}  `

    if (status === 'pending') {
      const body = 'doing'
      const method = RequestOptions.put(token, body)
      CallAPI(URL, method).then((json) => {
        if (!json.code) {
          const newOrders = [...orderlist]
          newOrders.splice(index, 1, json)
          setOrderlist(newOrders)
        } else {
          setCode(String(json.code))
          setShow(true)
        }
      })
    }
    if (status === 'doing') {
      const body = 'done'
      const method = RequestOptions.put(token, body)
      CallAPI(URL, method).then((json) => {
        if (!json.code) {
          const newOrders = [...orderlist]
          newOrders.splice(index, 1)
          setOrderlist(newOrders)
        } else {
          setCode(String(json.code))
          setShow(true)
        }
      })
    }

    if (status === 'done') {
      const body = 'finished'
      const method = RequestOptions.put(token, body)
      CallAPI(URL, method).then((json) => {
        if (!json.code) {
          const newOrders = [...orderlist]
          newOrders.splice(index, 1)
          setOrderlist(newOrders)
        } else {
          setCode(String(json.code))
          setShow(true)
        }
      })
    }
  }

  const handleDelete = (index, id, status) => {
    setModalShow(true)
    setDeleteID(id)
    setDeleteIndex(index)
    setDeleteStatus(status)
  }

  // eslint-disable-next-line consistent-return
  const getOrderStatus = (status) => {
    if (role === 'hall') {
      if (status === 'pending') return 'delete'
    } else {
      if (status === 'pending') return 'doing'
      if (status === 'doing') return 'done'
      if (status === 'done') return 'delivery'
    }
  }

  function result() {
    if (orderlist) {
      return (
        <>
          {orderlist
            .sort((a, b) => (a.id > b.id ? 1 : -1))
            .map((item, index) => (
              <div key={item.id} className='card-template'>
                <Card order={item} />

                {pending && item.status !== 'finished' && (
                  <ButtonCard
                    onClick={() => handleStatus(index, item.id, item.status)}
                    label={getOrderStatus(item.status)}
                    classStyle={getOrderStatus(item.status)}
                  />
                )}

                {done && item.status === 'done' && (
                  <ButtonCard
                    onClick={() => handleStatus(index, item.id, item.status)}
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

          <ToastGroup
            code={errCode}
            onClose={() => setShow(false)}
            show={show}
          />

          <ModalMessage show={modalShow} cancelOrder={cancelOrder} />
        </>
      )
    }
    return null
  }
  return result()
}
export default ListOrders
