import { useState } from 'react'
import { ReactComponent as Logo } from '../images/mr-logo.svg'
import { PrimaryButton, SecondaryButton, Box, Input } from '../components/base'
import styled from 'styled-components'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

const Login = ({ token, setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleChange = (e) => {
    if (e.target.name === 'username') {
      setUsername(e.target.value)
    } else if (e.target.name === 'password') {
      setPassword(e.target.value)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post('/api/login', { username, password })
      .then((res) => setToken(res.data.token))
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <div>
      {token && <Redirect to="/robots" />}
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          maxWidth="600px"
          mx="auto"
          mt={[0, 6]}
          bg="white"
          p={4}
          height={['100vh', 'auto']}
        >
          <StyledLogo alt="Mondo Robot logo" />
          <Input
            mb={4}
            label="Username"
            name="username"
            type="text"
            value={username}
            onChange={handleChange}
            required
          />
          <Input
            mb={4}
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={handleChange}
            required
          />
          <PrimaryButton mt={3} type="submit">
            Log In
          </PrimaryButton>

          <StyledLink to="/signup">
            <SecondaryButton mt={3}>Register</SecondaryButton>
          </StyledLink>
        </Box>
      </form>
    </div>
  )
}

const StyledLogo = styled(Logo)`
  margin-top: 16px;
  margin-bottom: 80px;
`

const StyledLink = styled(Link)`
  width: 100%;
`

export default Login
