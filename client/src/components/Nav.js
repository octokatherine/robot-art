import { Box } from './base/'
import { ReactComponent as Logo } from '../images/mr-logo-small.svg'
import styled from 'styled-components'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

const Nav = ({ token, setToken }) => {
  const logout = () => {
    axios.delete('/logout').then(() => setToken(null))
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      bg="white"
      py="24px"
      px={[3, 4]}
    >
      {!token && <Redirect to="/login" />}
      <Box display="flex" alignItems="center">
        <StyledLogo />
        <BoldLink to="/robots">Robots</BoldLink>
        <BoldLink to="/results">Results</BoldLink>
      </Box>
      <Box display="flex" alignItems="center">
        <PlainLink to="/admin">Admin</PlainLink>
        <PlainLink onClick={logout} to="/login">
          Log Out
        </PlainLink>
      </Box>
    </Box>
  )
}

const StyledLogo = styled(Logo)`
  width: 81px;
  margin-right: 32px;
`

const BoldLink = styled(Link)`
  margin-right: 32px;
  text-decoration: none;
  color: ${(props) => props.theme.palette.gray3};
  font-weight: bold;
`

const PlainLink = styled(Link)`
  margin-right: 24px;
  text-decoration: none;
  color: ${(props) => props.theme.palette.gray2};
`

export default Nav
