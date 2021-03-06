import axios from 'axios'
import { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

const withAdmin = (ComponentToProtect) => (props) => {
  const [loading, setLoading] = useState(true)
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    let unmounted = false
    let source = axios.CancelToken.source()
    axios
      .get('/api/checkAdmin', {
        cancelToken: source.token,
      })
      .then(() => {
        if (!unmounted) setLoading(false)
      })
      .catch((err) => {
        if (!unmounted) {
          console.log(err)
          setLoading(false)
          setRedirect(true)
        }
      })
    return function () {
      unmounted = true
      source.cancel('Cancelling in cleanup')
    }
  }, [])

  if (loading) {
    return null
  }
  if (redirect) {
    return <Redirect to="/robots" />
  }
  return <ComponentToProtect {...props} />
}

export default withAdmin
