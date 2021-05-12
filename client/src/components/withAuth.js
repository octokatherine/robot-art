import { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { TokenContext } from '../App'

const withAuth = (ComponentToProtect) => (props) => {
  const { token } = useContext(TokenContext)

  if (!token) {
    return <Redirect to="/login" />
  }
  return <ComponentToProtect {...props} />
}

export default withAuth
