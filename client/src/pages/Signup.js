import { useState } from 'react'
import { ReactComponent as Logo } from '../images/mr-logo.svg'
import { PrimaryButton, SecondaryButton, Box, Input } from '../components/base'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Signup = () => {
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
    fetch('/users', {
      method: 'POST',
      body: JSON.stringify({ username, password, fullname }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.status === 201) {
          console.log('success')
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
            label="Full Name"
            name="fullname"
            type="text"
            value={fullname}
            onChange={handleChange}
          />
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
          <StyledLink to="/login">
            <PrimaryButton mt={3}>Log In</PrimaryButton>
          </StyledLink>
          <SecondaryButton mt={3} type="submit">
            Register
          </SecondaryButton>
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
