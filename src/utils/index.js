/* eslint-disable camelcase */
export const getCurrentUser = JSON.parse(localStorage.getItem('currentUser'))

export const validatePageAccess = (pageName) => {
  const isAuthenticated = localStorage.getItem(`token`)
  const { role } = getCurrentUser

  if (!role) return false
  if (isAuthenticated && role.toUpperCase() === pageName.toUpperCase())
    return true
  return false
}

export const calculateTotal = (productsChart) =>
  productsChart.reduce((accumulator, current) => {
    const { qtd, price } = current
    accumulator = Number(qtd * price + accumulator)
    return accumulator
  }, 0)

export const updateChartItem = (productToSet, productsChart) =>
  productsChart.map((i) => {
    if (i.id === productToSet.id) {
      i.qtd += productToSet.qtd
    }
    return i
  })

export const isOnTheList = (productToSet, productsChart) =>
  productsChart.some(({ id }) => id === productToSet.id)

export const getBurger = (burgerList, chosenBurger) => {
  burgerList.find(({ name, flavor, complement }) => {
    if (!chosenBurger.complement)
      return (
        name === chosenBurger.name &&
        flavor === chosenBurger.flavor &&
        complement === null
      )
    return (
      name === chosenBurger.name &&
      flavor === chosenBurger.flavor &&
      complement === chosenBurger.complement
    )
  })
}

export const sectionFiltered = (productsTranslated, type) =>
  productsTranslated.filter(({ sub_type }) => sub_type.includes(type))

export const filterOrder = (array, type) => {
  const listFiltered = array.filter(({ status }) => status.includes(type))
  return listFiltered
}

export const filterOrderByTwoConditions = (
  array,
  firstCondition,
  secondCondition
) => {
  const listFiltered = array.filter(
    ({ status }) =>
      status.includes(firstCondition) || status.includes(secondCondition)
  )
  return listFiltered
}
