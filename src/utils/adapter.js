/* eslint-disable camelcase */
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

export const verifyErrorCode = {
  '001': 'You have to chose a burger option. Please, try again.',
  '002': 'Order canceled!',
  '003': 'There is nothing to order. Please, chose the products.',
  200: 'Order sent to the kitchen succesfully!',
  400: 'Missing required data or no changes applied. Please, try again.',
  401: 'User not authenticated. Please, sign in and try again.',
  403: 'Order belongs to another restaurant. Please, try with a different info.',
  404: 'Ops! Something went wrong. Please, try again.',
}
