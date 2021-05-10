import { useState, useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import { createGlobalStyle } from 'styled-components'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Robots from './pages/Robots'
import Admin from './pages/Admin'
import Nav from './components/Nav'
import axios from 'axios'

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
  const [token, setToken] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [robots, setRobots] = useState([])

  useEffect(() => {
    if (token) {
      axios
        .get('/robots')
        .then((response) => setRobots(response.data))
        .catch((err) => console.log(err))
    }
    axios
      .get('users/me')
      .then((res) => {
        setIsAdmin(res.data.isAdmin)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [token])

  useEffect(() => {
    axios
      .get('/checkToken')
      .then((res) => setToken(res.data.token))
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/robots" />
          </Route>
          <Route path="/login">
            <Login token={token} setToken={setToken} />
          </Route>
          <Route path="/signup">
            <Signup token={token} setToken={setToken} />
          </Route>
          <Route path="/robots">
            <Nav token={token} setToken={setToken} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
            <Robots robots={robots} setRobots={setRobots} />
          </Route>
          <Route path="/admin">
            <Nav token={token} setToken={setToken} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
            <Admin robots={robots} setRobots={setRobots} />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  )
}

export default App
