const CallAPI = async (url, method) => {
  const response = await fetch(url, method)
  const data = await response.json()
  return data
}

export default CallAPI
