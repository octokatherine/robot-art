import { ThemeProvider } from 'styled-components'
import { createGlobalStyle } from 'styled-components'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Robots from './pages/Robots'
import Admin from './pages/Admin'
import Nav from './components/Nav'

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    background: #F4F6F8;
    margin: 0;
    font-family: sans-serif;
    color: ${(props) => props.theme.palette.gray3};
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
          <Route exact path="/">
            <Redirect to="/robots" />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/robots">
            <Nav />
            <Robots />
          </Route>
          <Route path="/admin">
            <Nav />
            <Admin />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  )
}

export default App
