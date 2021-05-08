import { ThemeProvider } from 'styled-components'
import { createGlobalStyle } from 'styled-components'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'

const GlobalStyle = createGlobalStyle`
  body {
    background: #F4F6F8;
  }
`

const theme = {
  spacing: 4,
  palette: {
    gray0: '#F4F6F8',
    gray1: '#D8DADB',
    gray2: '#737475',
    gray3: '#414242',
  },
}

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/Signup">
            <Signup />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  )
}

export default App
