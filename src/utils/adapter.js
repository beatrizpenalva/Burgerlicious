export const createOrdermethod = (body, token) => ({
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
    Authorization: token,
  },
  body,
})

export const productOrder = (array) => {
  const copyArray = [...array]
  const newObjList = copyArray.map(
    ({
      complement,
      createAt,
      flavor,
      image,
      name,
      price,
      // eslint-disable-next-line camelcase
      sub_type,
      type,
      updateAt,
      ...rest
    }) => rest
  )
  return newObjList
}

export const translatePTtoEN = {
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
