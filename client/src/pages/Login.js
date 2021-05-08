import { ReactComponent as Logo } from '../images/mr-logo.svg'
import { PrimaryButton, SecondaryButton, Box, Input } from '../components/base'
import styled from 'styled-components'

const Login = () => {
  return (
    <div>
      <form action="/login" method="post">
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
          <Input mb={4} label="Username" name="username" type="text" />
          <Input mb={4} label="Password" name="password" type="password" />
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
