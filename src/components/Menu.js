import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import CallAPI from '../services/api'
import MenuItems from './Menudetails'
import ToastGroup from './Toast'
import ModalMessage from './Modal'

const Menu = () => {
  const nameLS = JSON.parse(localStorage.getItem('currentUser'))
  const { token } = nameLS

  const newOrder = {
    client: '',
    table: '',
    products: [],
  }

  const [menuSection, setMenuSection] = useState('')
  const [products, setProducts] = useState([])
  const [totalToPay, setTotal] = useState(0)
  const [order, setOrder] = useState(newOrder)
  const [show, setShow] = useState(false)
  const [errCode, setCode] = useState('')
  const [modalShow, setModalShow] = useState(false)

  useEffect(() => {
    setTotal(() => {
      const newTotal = products.reduce((accumulator, current) => {
        const { quantity, price } = current
        accumulator = Number(quantity * price + accumulator)
        return accumulator
      }, 0)

      return newTotal
    })
  }, [products])

  const addItem = (product) => {
    const productToSet = product
    const isOnTheList = products.some((item) => item.id === productToSet.id)

    if (!isOnTheList) {
      setProducts((productsState) => [...productsState, productToSet])
    } else {
      const newQuantity = productToSet.quantity
      const itemUptaded = products.map((i) => {
        if (i.id === productToSet.id) {
          i.quantity += newQuantity
        }
        return i
      })
      setProducts(() => itemUptaded)
    }
  }

  const deleteProduct = (index) => {
    const getProductsArray = [...products]
    getProductsArray.splice(index, 1)
    setProducts(getProductsArray)
  }

  const handlePlusClick = (index) => {
    const productsList = [...products]
    productsList[index].quantity = +productsList[index].quantity + 1
    setProducts(productsList)
  }

  const handleMinusClick = (index) => {
    const productsList = [...products]
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

  const createOrder = ({ client, table, products }) => {
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
    const productsList = [...products]
    const updateOrder = { ...order, products: productsList }
    setOrder(updateOrder)
    createOrder(updateOrder)
  }

  const handleCancel = (event) => {
    event.preventDefault()
    setModalShow(true)
  }

  const cancelOrder = (answer) => {
    setModalShow(false)
    if (answer === true) {
      setOrder(newOrder)
      setProducts([])
      if (products.length !== 0) {
        setCode('002')
        setShow(true)
      }
    }
  }

  return (
    <>
      <section className='menu-info'>
        <section className='items-accordion'>
          <Accordion defaultActiveKey='0'>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey='0'>
                BREAKFAST
              </Accordion.Toggle>
              <Accordion.Collapse eventKey='0'>
                <Card.Body className='card-accordion'>
                  <section className='item-menu'>
                    <button
                      type='button'
                      className='menu-button'
                      onClick={() => setMenuSection('Snacks')}
                    >
                      Snacks{' '}
                      <span className='material-icons'>
                        {' '}
                        keyboard_arrow_right{' '}
                      </span>
                    </button>
                    <button
                      type='button'
                      className='menu-button last-menu-item'
                      onClick={() => setMenuSection('DrinksCoffee')}
                    >
                      Drinks{' '}
                      <span className='material-icons'>
                        {' '}
                        keyboard_arrow_right
                      </span>
                    </button>
                  </section>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey='1'>
                BURGER
              </Accordion.Toggle>
              <Accordion.Collapse eventKey='1'>
                <Card.Body>
                  <section className='item-menu'>
                    <button
                      type='button'
                      className='menu-button'
                      onClick={() => setMenuSection('Burgers')}
                    >
                      Burgers
                      <span className='material-icons'>
                        {' '}
                        keyboard_arrow_right{' '}
                      </span>
                    </button>
                    <button
                      type='button'
                      className='menu-button'
                      onClick={() => setMenuSection('Sides')}
                    >
                      Sides{' '}
                      <span className='material-icons'>
                        {' '}
                        keyboard_arrow_right{' '}
                      </span>
                    </button>
                    <button
                      type='button'
                      className='menu-button last-menu-item'
                      onClick={() => setMenuSection('Drinks')}
                    >
                      Drinks
                      <span className='material-icons'>
                        {' '}
                        keyboard_arrow_right{' '}
                      </span>
                    </button>
                  </section>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </section>

        <section className='section-details'>
          <MenuItems
            option={menuSection}
            addItem={addItem}
            handleError={handleError}
          />
        </section>
      </section>

      <form
        className='order-summary'
        onSubmit={(event) => handleSendOrder(event)}
      >
        <section className='client-info'>
          <label htmlFor='client-name'>
            Client:
            <input
              id='client-name'
              type='text'
              placeholder='Client name'
              className='form-input'
              value={order.client}
              onChange={(event) => {
                setOrder({ ...order, client: event.target.value })
              }}
              required
            />
          </label>

          <label htmlFor='table'>
            Table:
            <input
              id='table'
              type='number'
              placeholder='Table number'
              className='form-input'
              min='1'
              max='30'
              value={order.table}
              onChange={(event) => {
                setOrder({ ...order, table: event.target.value })
              }}
              required
            />
          </label>
        </section>

        <section className='products-info'>
          {products.length > 0 &&
            products.map((item, index) => {
              if (item.quantity > 0) {
                return (
                  <section key={item.id}>
                    <section className='item-description list-items'>
                      <button
                        type='button'
                        className='delete-item'
                        onClick={() => deleteProduct(index)}
                      >
                        <span className='material-icons'>delete</span>
                      </button>
                      <p className='product'>{item.name}</p>
                      <section className='input-group'>
                        <button
                          type='button'
                          className='count-button'
                          onClick={() => handlePlusClick(index)}
                        >
                          {' '}
                          +{' '}
                        </button>
                        <p className='quantity-field'>{item.quantity}</p>
                        <button
                          type='button'
                          className='count-button'
                          onClick={() =>
                            item.quantity > 0 && handleMinusClick(index)
                          }
                        >
                          {' '}
                          -{' '}
                        </button>
                      </section>
                    </section>
                    <p className='product burger-info'>
                      {item.flavor} {item.complement}
                    </p>
                  </section>
                )
              }
            })}
        </section>

        <section className='bottom-section'>
          <p className='total-price'>
            {' '}
            TOTAL PRICE: <span className='total-value'>${totalToPay}</span>
          </p>
          <section className='order-button-section'>
            <button
              type='button'
              className='cancel-button'
              onClick={(event) => handleCancel(event)}
            >
              CANCEL{' '}
            </button>
            <button type='submit' className='form-order'>
              {' '}
              SEND{' '}
            </button>
          </section>
        </section>
      </form>

      <ToastGroup code={errCode} onClose={() => setShow(false)} show={show} />

      <ModalMessage show={modalShow} cancelOrder={cancelOrder} />
    </>
  )
}

export default Menu
