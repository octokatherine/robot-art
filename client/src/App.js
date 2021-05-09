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
  const [robots, setRobots] = useState([])

  useEffect(() => {
    if (token) {
      axios
        .get('/robots')
        .then((response) => setRobots(response.data))
        .catch((err) => console.log(err))
    }
  }, [token])

  useEffect(() => {
    fetch('/checkToken')
      .then((res) => res.json())
      .then((data) => setToken(data.token))
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
          <Route token={token} setToken={setToken} path="/signup">
            <Signup />
          </Route>
          <Route path="/robots">
            <Nav />
            <Robots robots={robots} setRobots={setRobots} />
          </Route>
          <Route path="/admin">
            <Nav />
            <Admin robots={robots} setRobots={setRobots} />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  )
}

export default App
