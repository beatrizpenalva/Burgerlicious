const RequestOptions = {
  post(props) {
    const request = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: props,
    }
    return request
  },

  getAndDelete(method, token) {
    const request = {
      method,
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

export default RequestOptions
