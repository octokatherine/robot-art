import React, { useState, useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import { createGlobalStyle } from 'styled-components'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Robots from './pages/Robots'
import Admin from './pages/Admin'
import Nav from './components/Nav'
import axios from 'axios'
import Results from './pages/Results'

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

export const TokenContext = React.createContext(null)

const App = () => {
  const [token, setToken] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [robots, setRobots] = useState([])
  const [userVote, setUserVote] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (token) {
      axios
        .get('/api/robots')
        .then((response) => setRobots(response.data))
        .catch((err) => console.log(err))
    }
    axios
      .get('/api/users/me')
      .then((res) => {
        setIsAdmin(res.data.isAdmin)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [token])

  useEffect(() => {
    axios
      .get('/api/checkToken')
      .then((res) => {
        setToken(res.data.token)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }, [])

  if (loading) return null
  return (
    <TokenContext.Provider value={{ token, setToken }}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router>
          {token && (
            <Nav
              token={token}
              setToken={setToken}
              isAdmin={isAdmin}
              setIsAdmin={setIsAdmin}
              setUserVote={setUserVote}
            />
          )}
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
              <Robots
                robots={robots}
                setRobots={setRobots}
                userVote={userVote}
                setUserVote={setUserVote}
              />
            </Route>
            <Route path="/results">
              <Results robots={robots} />
            </Route>
            <Route path="/admin">
              <Admin robots={robots} setRobots={setRobots} />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </TokenContext.Provider>
  )
}

export default App
