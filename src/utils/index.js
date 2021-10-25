export const isAuthenticated = () => {
  const validation = localStorage.getItem(`token`)
  if (validation !== undefined && validation !== null) {
    return true
  }
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
  productsChart.some((item) => item.id === productToSet.id)

export const getBurger = (burgerList, chosenBurger) => {
  burgerList.find((item) => {
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
}

export const sectionFiltered = (productsTranslated, type) =>
  productsTranslated.filter((item) => item.sub_type.includes(type))
