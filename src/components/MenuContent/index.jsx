import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import useFetch from '../../services/Hooks/useFetch'
import requestOptions from '../object/requestOptions'
import Itens from '../MenuItens/index'
import BurgerSection from '../MenuSectionBurger/index'
import { getBurger, sectionFiltered } from '../../utils/index'

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

  const nameLS = JSON.parse(localStorage.getItem('currentUser'))
  const { data, request } = useFetch()

  const [snacksList, setSnacksList] = useState([])
  const [coffeeList, setCoffeeList] = useState([])
  const [burgerList, setBurgerList] = useState([])
  const [drinksList, setDrinksList] = useState([])
  const [sidesList, setSidesList] = useState([])
  const [dataTranslated, setDataTranslated] = useState([])

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
    const productsTranslated = allProducts.map((item) => ({
      ...item,
      name: translatePTtoEN[item.name],
      flavor: translatePTtoEN[item.flavor],
      complement: translatePTtoEN[item.complement],
    }))

    setDataTranslated(productsTranslated)

    setSnacksList(
      productsTranslated.filter((item) => item.name.includes('Sandwich'))
    )
    setCoffeeList(
      productsTranslated.filter(
        (item) => item.name.includes('Coffee') || item.name.includes('Juice')
      )
    )
    setBurgerList(sectionFiltered(productsTranslated, 'hamburguer'))
    setDrinksList(sectionFiltered(productsTranslated, 'drinks'))
    setSidesList(sectionFiltered(productsTranslated, 'side'))
  }, [data])

  const getBurgerId = (burgerObj) => {
    if (burgerObj.name === '') {
      handleError('001')
    } else {
      const chosenBurger = burgerObj
      const burgerById = getBurger(burgerList, chosenBurger)
      addItem({ ...chosenBurger, ...burgerById })
    }
  }

  const createItemObject = (code, count) => {
    const updatedItem = dataTranslated.find((i) => i.id === +code)
    const newProduct = { qtd: count, ...updatedItem }
    addItem(newProduct)
  }

  return (
    <>
      {option === 'Snacks' && (
        <Itens list={snacksList} createItemObject={createItemObject} />
      )}
      {option === 'DrinksCoffee' && (
        <Itens list={coffeeList} createItemObject={createItemObject} />
      )}
      {option === 'Sides' && (
        <Itens list={sidesList} createItemObject={createItemObject} />
      )}
      {option === 'Drinks' && (
        <Itens list={drinksList} createItemObject={createItemObject} />
      )}
      {option === 'Burgers' && <BurgerSection getBurgerId={getBurgerId} />}
    </>
  )
}

MenuItems.propTypes = {
  option: PropTypes.string.isRequired,
  addItem: PropTypes.func.isRequired,
  handleError: PropTypes.func.isRequired,
}

export default MenuItems
