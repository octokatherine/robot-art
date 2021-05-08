const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const userRouter = require('./routers/userRouter')

const app = express()

app.use(cookieParser())
app.set('trust proxy', 1)
app.use(
  session({
    secret: 'mocha cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
)
app.use(express.json())
app.use(express.static(path.join(__dirname, '.', 'public')))
app.use('/users', userRouter)

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '.', 'public', 'index.html'))
})

module.exports = app
