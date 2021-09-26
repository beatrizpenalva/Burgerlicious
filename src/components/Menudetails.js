/* eslint-disable prettier/prettier */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
/* eslint-disable no-use-before-define */
/* eslint-disable guard-for-in */
/* eslint-disable no-shadow */
/* eslint-disable no-restricted-syntax */
/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import useFetch from '../services/Hooks/useFetch'
import requestOptions from './object/requestOptions'
// import Loading from "../components/errors/loading"

const MenuItems = ({ option, addItem, handleError }) => {
  const translatePTtoEN = {
    'Misto quente': 'Cheese Sandwich',
    'Café americano': 'Americano Coffee',
    'Café com leite': 'Espresso Coffee',
    'Suco de fruta natural': 'Orange juice',
    'Batata frita': 'Fries',
    'Anéis de cebola': 'Onion rings',
    'Água 500mL': 'Water 500mL',
    'Água 750mL': 'Water 750mL',
    'Refrigerante 500mL': 'Soda 500mL',
    'Refrigerante 750mL': 'Soda 750mL',
    'Hambúrguer simples': 'Smash burger',
    'Hambúrguer duplo': 'Double burger',
    carne: 'Meat',
    frango: 'Chicken',
    vegetariano: 'Veggie',
    queijo: 'Cheese',
    ovo: 'Egg',
  }

  const newBurger = {
    name: '',
    flavor: '',
    complement: '',
    quantity: 1,
  }

  const nameLS = JSON.parse(localStorage.getItem('currentUser'))
  const { data, request } = useFetch()

  const [burger, setBurger] = useState(newBurger)
  const [items, setItems] = useState({})
  const [snacksList, setSnacksList] = useState([])
  const [coffeeList, setCoffeeList] = useState([])
  const [burgerList, setBurgerList] = useState([])
  const [drinksList, setDrinksList] = useState([])
  const [sidesList, setSidesList] = useState([])
  const [dataTranslated, setDataTranslated] = useState([])
  // const [loading, setLoading] = useState(true); //passar todas as chamadas para o elemento pai

  useEffect(() => {
    async function fetchProducts() {
      const method = requestOptions.getAndDelete('GET', nameLS.token)
      const URL = 'https://lab-api-bq.herokuapp.com/products'
      await request(URL, method)
    }
    fetchProducts()
  }, [request, nameLS.token])

  useEffect(() => {
    if (!data) return

    const allProducts = data
    const productsTranslated = allProducts.map((item) => {
      return {
        ...item,
        name: translatePTtoEN[item.name],
        flavor: translatePTtoEN[item.flavor],
        complement: translatePTtoEN[item.complement],
      }
    })

    setDataTranslated(productsTranslated)

    setSnacksList(
      productsTranslated.filter((item) => item.name.includes('Sandwich'))
    )
    setCoffeeList(
      productsTranslated.filter(
        (item) => item.name.includes('Coffee') || item.name.includes('Juice')
      )
    )
    setBurgerList(
      productsTranslated.filter((item) => item.sub_type.includes('hamburguer'))
    )
    setDrinksList(
      productsTranslated.filter((item) => item.sub_type.includes('drinks'))
    )
    setSidesList(
      productsTranslated.filter((item) => item.sub_type.includes('side'))
    )

    // setLoading(false);
  }, [data])

  const handleClick = (items) => {
    for (const property in items) {
      createItemObject(property, items[property])
    }

    setItems({})
  }

  const getBurgerId = (burger) => {
    if (burger.name === '') {
      handleError('001')
    } else {
      const chosenBurger = burger
      const burgerById = burgerList.find((item) => {
        if (!chosenBurger.complement)
          return (
            item.name === chosenBurger.name &&
            item.flavor === chosenBurger.flavor &&
            item.complement === null
          )
        return (
          item.name === chosenBurger.name &&
          item.flavor === chosenBurger.flavor &&
          item.complement === chosenBurger.complement
        )
      })

      addItem({ ...chosenBurger, ...burgerById })
    }
  }

  const createItemObject = (code, count) => {
    const updatedItem = dataTranslated.find((i) => i.id == code)
    const newProduct = { quantity: count, ...updatedItem }
    addItem(newProduct)
  }

  const Snacks = ({ list }) => {
    return (
      <>
        <section className='menu-description'>
          {list.length &&
            list.map((item) => {
              let count

              if (items[item.id]) count = items[item.id]
              else count = 0

              return (
                <section className='item-description' key={item.name}>
                  <p className='product'>{item.name}</p>
                  <p className='price'>${item.price}</p>
                  <section className='input-group'>
                    <button
                      className='count-button'
                      onClick={() =>
                        setItems({ ...items, [item.id]: count + 1 })
                      }
                    >
                      {' '}
                      +{' '}
                    </button>
                    <p className='quantity-field'>{count}</p>
                    <button
                      className='count-button'
                      onClick={() =>
                        count > 0 &&
                        setItems({ ...items, [item.id]: count - 1 })
                      }
                    >
                      {' '}
                      -{' '}
                    </button>
                  </section>
                </section>
              )
            })}
        </section>
        <button className='send-button' onClick={() => handleClick(items)}>
          ADD ITEM
        </button>
      </>
    )
  }

  const Coffee = ({ list }) => {
    return (
      <>
        <section className='menu-description'>
          {list.length &&
            list.map((item) => {
              let count

              if (items[item.id]) count = items[item.id]
              else count = 0

              return (
                <section className='item-description' key={item.name}>
                  <p className='product'>{item.name}</p>
                  <p className='price'>${item.price}</p>
                  <section className='input-group'>
                    <button
                      className='count-button'
                      onClick={() =>
                        setItems({ ...items, [item.id]: count + 1 })
                      }
                    >
                      {' '}
                      +{' '}
                    </button>
                    <p className='quantity-field'>{count}</p>
                    <button
                      className='count-button'
                      onClick={() =>
                        count > 0 &&
                        setItems({ ...items, [item.id]: count - 1 })
                      }
                    >
                      {' '}
                      -{' '}
                    </button>
                  </section>
                </section>
              )
            })}
        </section>
        <button className='send-button' onClick={() => handleClick(items)}>
          ADD ITEM
        </button>
      </>
    )
  }

  const Burger = () => {
    return (
      <>
        <section className='burger-details'>
          <section>
            <section className='burger-items'>
              <label className={burger.name === 'Smash burger' ? 'active' : ''}>
                Smash burger $10
                <input
                  type='radio'
                  name='size'
                  value='Smash burger'
                  onChange={(event) => {
                    setBurger({ ...burger, name: event.target.value })
                  }}
                />
              </label>

              <label
                className={burger.name === 'Double burger' ? 'active' : ''}
              >
                Double burger $10
                <input
                  type='radio'
                  name='size'
                  value='Double burger'
                  onChange={(event) => {
                    setBurger({ ...burger, name: event.target.value })
                  }}
                />
              </label>
            </section>

            <section className='burger-items'>
              <label className={burger.flavor === 'Meat' ? 'active' : ''}>
                Meat
                <input
                  type='radio'
                  name='burger'
                  value='Meat'
                  onChange={(event) => {
                    setBurger({ ...burger, flavor: event.target.value })
                  }}
                />
              </label>

              <label className={burger.flavor === 'Chicken' ? 'active' : ''}>
                Chicken
                <input
                  type='radio'
                  name='burger'
                  value='Chicken'
                  onChange={(event) => {
                    setBurger({ ...burger, flavor: event.target.value })
                  }}
                />
              </label>

              <label className={burger.flavor === 'Veggie' ? 'active' : ''}>
                Veggie
                <input
                  type='radio'
                  name='burger'
                  value='Veggie'
                  onChange={(event) => {
                    setBurger({ ...burger, flavor: event.target.value })
                  }}
                />
              </label>
            </section>

            <section className='burger-items'>
              <label className={burger.complement === 'Cheese' ? 'active' : ''}>
                Cheese $1
                <input
                  type='radio'
                  name='extra'
                  value='Cheese'
                  onChange={(event) => {
                    setBurger({ ...burger, complement: event.target.value })
                  }}
                />
              </label>

              <label className={burger.complement === 'Egg' ? 'active' : ''}>
                Egg $1
                <input
                  type='radio'
                  name='extra'
                  value='Egg'
                  onChange={(event) => {
                    setBurger({ ...burger, complement: event.target.value })
                  }}
                />
              </label>
            </section>
          </section>
        </section>
        <button
          className='send-button'
          onClick={() => {
            getBurgerId(burger)
          }}
        >
          ADD ITEM
        </button>
      </>
    )
  }

  const Sides = ({ list }) => {
    return (
      <>
        <section className='menu-description'>
          {list.length &&
            list.map((item) => {
              let count

              if (items[item.id]) count = items[item.id]
              else count = 0

              return (
                <section className='item-description' key={item.name}>
                  <p className='product'>{item.name}</p>
                  <p className='price'>${item.price}</p>
                  <section className='input-group'>
                    <button
                      className='count-button'
                      onClick={() =>
                        setItems({ ...items, [item.id]: count + 1 })
                      }
                    >
                      {' '}
                      +{' '}
                    </button>
                    <p className='quantity-field'>{count}</p>
                    <button
                      className='count-button'
                      onClick={() =>
                        count > 0 &&
                        setItems({ ...items, [item.id]: count - 1 })
                      }
                    >
                      {' '}
                      -{' '}
                    </button>
                  </section>
                </section>
              )
            })}
        </section>
        <button className='send-button' onClick={() => handleClick(items)}>
          ADD ITEM
        </button>
      </>
    )
  }

  const Drinks = ({ list }) => {
    return (
      <>
        <section className='menu-description'>
          {list.length &&
            list.map((item) => {
              let count

              if (items[item.id]) count = items[item.id]
              else count = 0

              return (
                <section className='item-description' key={item.name}>
                  <p className='product'>{item.name}</p>
                  <p className='price'>${item.price}</p>
                  <section className='input-group'>
                    <button
                      className='count-button'
                      onClick={() =>
                        setItems({ ...items, [item.id]: count + 1 })
                      }
                    >
                      {' '}
                      +{' '}
                    </button>
                    <p className='quantity-field'>{count}</p>
                    <button
                      className='count-button'
                      onClick={() =>
                        count > 0 &&
                        setItems({ ...items, [item.id]: count - 1 })
                      }
                    >
                      {' '}
                      -{' '}
                    </button>
                  </section>
                </section>
              )
            })}
        </section>
        <button className='send-button' onClick={() => handleClick(items)}>
          ADD ITEM
        </button>
      </>
    )
  }

  return (
    <>
      {option === 'Snacks' && <Snacks list={snacksList} />}
      {option === 'DrinksCoffee' && <Coffee list={coffeeList} />}

      {option === 'Burgers' && <Burger />}

      {option === 'Sides' && <Sides list={sidesList} />}
      {option === 'Drinks' && <Drinks list={drinksList} />}

      {/* {loading && <Loading />} */}
    </>
  )
}

export default MenuItems
