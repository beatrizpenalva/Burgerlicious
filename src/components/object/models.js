const AllModelsObject = {
  authAndUsers: {
    auth: 'https://lab-api-bq.herokuapp.com/auth',
    users: 'https://lab-api-bq.herokuapp.com/users',
    name: '',
    lastName: '',
    email: '',
    role: '',
    password: '',
    confirmPassword: '',
    token: '',
  },

  ordersList: {
    id: '',
    clientName: '',
    userId: '',
    table: '',
    status: '',
    processedAt: '',
    createdAt: '',
    updatedAt: '',
    products: [
      {
        id: '',
        name: '',
        flavor: '',
        complement: '',
        qtd: '',
      },
    ],
  },
}

export default AllModelsObject
