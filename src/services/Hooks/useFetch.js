import React from 'react'

function useFetch() {
  const [data, setData] = React.useState(null)
  const [error, setError] = React.useState(null)

  const request = React.useCallback(async (url, method) => {
    let response
    let json
    try {
      setError(null)
      response = await fetch(url, method)
      json = await response.json()
      if (response.ok === false) throw new Error(json.message)
    } catch (err) {
      json = null
      setError(err.message)
    } finally {
      setData(json)
      return { response, json }
    }
  }, [])

  return { data, error, request, setData }
}

export default useFetch
