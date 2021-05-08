import { useState } from 'react'
import { ReactComponent as Logo } from '../images/mr-logo.svg'
import { PrimaryButton, SecondaryButton, Box, Input } from '../components/base'
import styled from 'styled-components'

const Login = () => {
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
    fetch('/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.status === 200) {
          console.log('successful login')
        } else {
          const error = new Error(res.error)
          throw error
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          maxWidth="600px"
          mx="auto"
          bg="white"
          p={4}
        >
          <StyledLogo alt="Mondo Robot logo" />
          <Input
            mb={4}
            label="Username"
            name="username"
            type="text"
            value={username}
            onChange={handleChange}
          />
          <Input
            mb={4}
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={handleChange}
          />
          <PrimaryButton mt={3} type="submit">
            Log In
          </PrimaryButton>
          <SecondaryButton mt={3}>Register</SecondaryButton>
        </Box>
      </form>
    </div>
  )
}

const StyledLogo = styled(Logo)`
  margin-top: 16px;
  margin-bottom: 80px;
`

export default Login
