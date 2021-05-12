import { useState } from 'react'
import { ReactComponent as Logo } from '../images/mr-logo-small.svg'
import { ReactComponent as HamburgerIcon } from '../images/hamburger-icon.svg'
import { ReactComponent as CloseIcon } from '../images/close-icon.svg'
import styled from 'styled-components'
import { Box } from './base/'
import { Link, useHistory, useLocation } from 'react-router-dom'
import axios from 'axios'

const Nav = ({ setToken, isAdmin, setIsAdmin, setUserVote }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false)
  const location = useLocation()
  let history = useHistory()

  const logout = () => {
    axios.delete('/api/logout').then(() => {
      setIsAdmin(false)
      setToken(null)
      setIsMenuVisible(false)
      setUserVote(null)
      history.push('/login')
    })
  }

  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        bg="white"
        py="24px"
        px={[3, 4]}
      >
        <Box display="flex" alignItems="center">
          <StyledLogo />
          <NavLinkContainer display="flex" alignItems="center">
            <BoldLink to="/robots">Robots</BoldLink>
            <BoldLink to="/results">Results</BoldLink>
          </NavLinkContainer>
        </Box>
        <Box>
          <NavLinkContainer display="flex" alignItems="center">
            {isAdmin && <PlainLink to="/admin">Admin</PlainLink>}
            <PlainLink onClick={logout} to="/login">
              Log Out
            </PlainLink>
          </NavLinkContainer>
          <Hamburger onClick={() => setIsMenuVisible(true)} />
        </Box>
      </Box>
      {isMenuVisible && (
        <MobileMenu>
          <Close onClick={() => setIsMenuVisible(false)} />
          <Box display="flex" flexDirection="column">
            <MobileNavLink
              selected={location.pathname === '/robots'}
              onClick={() => setIsMenuVisible(false)}
              to="/robots"
            >
              Robots
            </MobileNavLink>
            <MobileNavLink
              selected={location.pathname === '/results'}
              onClick={() => setIsMenuVisible(false)}
              to="/results"
            >
              Results
            </MobileNavLink>
            {isAdmin && (
              <MobileNavLink
                selected={location.pathname === '/admin'}
                onClick={() => setIsMenuVisible(false)}
                to="/admin"
              >
                Admin
              </MobileNavLink>
            )}
            <MobileNavLink onClick={logout} to="/login">
              Logout
            </MobileNavLink>
          </Box>
        </MobileMenu>
      )}
    </Box>
  )
}

const MobileMenu = styled(Box)`
  background: ${(props) => props.theme.palette.gray3};
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  padding-top: 30%;
  z-index: 999;
`

const MobileNavLink = styled(Link)`
  font-size: 3em;
  color: ${(props) => (props.selected ? 'white' : props.theme.palette.gray1)};
  margin-inline: auto;
  margin-bottom: 32px;
  text-decoration: none;
`

const Hamburger = styled(HamburgerIcon)`
  display: none;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 600px) {
    display: block;
  }
`

const Close = styled(CloseIcon)`
  position: fixed;
  right: 32px;
  top: 32px;
  &:hover {
    cursor: pointer;
  }
`

const NavLinkContainer = styled(Box)`
  @media (max-width: 600px) {
    display: none;
  }
`

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
