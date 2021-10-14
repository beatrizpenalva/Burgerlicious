import React from 'react'
import RequestOptions from './object/requestOptions'
import CallAPI from '../services/api'
import useFetch from '../services/Hooks/useFetch'
import CardsKitchen from './CardsKitchen'
import Button from './Buttonorderstatus'
import ToastGroup from './Toast/index'
import ModalMessage from './Modal/index'
import { translatePTtoEN } from '../utils/adapter'

function ListOrders({ filterType }) {
  const nameLS = JSON.parse(localStorage.getItem('currentUser'))
  const { token, role } = nameLS
  const type = filterType

  const { data, request } = useFetch()
  const [dataTranslated, setDataTranslated] = React.useState([])
  const [pending, setPending] = React.useState(null)
  const [done, setDone] = React.useState(null)
  const [finish, setFinish] = React.useState(null)
  const [orderlist, setOrderlist] = React.useState(null)

  const [show, setShow] = React.useState(false)
  const [errCode, setCode] = React.useState('')
  const [modalShow, setModalShow] = React.useState(false)
  const [deleteID, setDeleteID] = React.useState(null)
  const [deleteIndex, setDeleteIndex] = React.useState(null)
  const [deleteStatus, setDeleteStatus] = React.useState(null)

  React.useEffect(() => {
    async function fetchOrders() {
      const method = RequestOptions.getAndDelete('GET', token)
      const URL = 'https://lab-api-bq.herokuapp.com/orders  '
      await request(URL, method)
    }
    fetchOrders()
  }, [request, token])

  React.useEffect(() => {
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

  React.useEffect(() => {
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

  React.useEffect(() => {
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

  function result() {
    if (orderlist) {
      return (
        <>
          {orderlist
            .sort((a, b) => (a.id > b.id ? 1 : -1))
            .map((item, index) => (
              <div key={item.id} className='card-template'>
                <CardsKitchen key={item.name}>{item}</CardsKitchen>

                {pending &&
                  item.status === 'pending' &&
                  item.status !== 'finished' && (
                    <Button
                      key={Math.random()}
                      onClick={() => handleStatus(index, item.id, item.status)}
                      className={item.status === 'pending' && 'btn-doing'}
                    >
                      {item.status === 'pending' && 'DOING'}
                    </Button>
                  )}

                {pending &&
                  item.status === 'doing' &&
                  item.status !== 'finished' && (
                    <Button
                      key={Math.random()}
                      onClick={() => handleStatus(index, item.id, item.status)}
                      className={item.status === 'doing' && 'btn-done'}
                    >
                      {item.status === 'doing' && 'DONE'}
                    </Button>
                  )}

                {done && item.status === 'done' && (
                  <Button
                    key={Math.random()}
                    onClick={() => handleStatus(index, item.id, item.status)}
                    className={item.status === 'done' && 'btn-finish'}
                  >
                    DELIVERY
                  </Button>
                )}
                {done && item.status === 'pending' && role === 'hall' && (
                  <Button
                    key={Math.random()}
                    onClick={() => handleDelete(index, item.id, item.status)}
                    className={item.status === 'pending' && 'btn-delete'}
                  >
                    DELETE
                  </Button>
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
