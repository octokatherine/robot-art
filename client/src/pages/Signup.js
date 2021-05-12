import { useState } from 'react'
import { ReactComponent as Logo } from '../images/mr-logo.svg'
import { PrimaryButton, SecondaryButton, Box, Input } from '../components/base'
import styled from 'styled-components'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

const Signup = ({ token, setToken }) => {
  const [fullname, setFullname] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleChange = (e) => {
    if (e.target.name === 'username') {
      setUsername(e.target.value)
    } else if (e.target.name === 'password') {
      setPassword(e.target.value)
    } else if (e.target.name === 'fullname') {
      setFullname(e.target.value)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post('/api/users', { username, password, fullname })
      .then(() => {
        axios.post('/api/login', { username, password }).then((res) => setToken(res.data))
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {token && <Redirect to="/robots" />}
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
            label="Full Name"
            name="fullname"
            type="text"
            value={fullname}
            onChange={handleChange}
            required
          />
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
            Register
          </PrimaryButton>
          <StyledLink to="/login">
            <SecondaryButton mt={3}>Log In</SecondaryButton>
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

export default Signup
