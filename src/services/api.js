const getURL = {
  auth: 'https://lab-api-bq.herokuapp.com/auth',
  users: 'https://lab-api-bq.herokuapp.com/users',
  products: 'https://lab-api-bq.herokuapp.com/products',
  orders: 'https://lab-api-bq.herokuapp.com/orders',
  getOneOrder(id) {
    return `https://lab-api-bq.herokuapp.com/orders/${id}`
  },
}

export const RequestOptions = {
  post(body) {
    const request = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    }
    return request
  },

  postAndAuth(body, token) {
    const request = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `${token}`,
      },
      body,
    }
    return request
  },

  get(token) {
    const request = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `${token}`,
      },
    }
    return request
  },

  delete(token) {
    const request = {
      method: 'DELETE',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `${token}`,
      },
    }
    return request
  },

  put(token, body) {
    const request = {
      method: 'PUT',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `${token}`,
      },
      body: `status=${body}`,
    }
    return request
  },
}

export const CallAPI = async (url, method) => {
  const findURL = getURL[url]
  const response = await fetch(findURL, method)
  const data = await response.json()
  return data
}
