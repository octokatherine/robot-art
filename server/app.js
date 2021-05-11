const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const userRouter = require('./routers/userRouter')
const robotRouter = require('./routers/robotRouter')
const voteRouter = require('./routers/voteRouter')
const authRouter = require('./routers/authRouter')

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '.', 'public')))

app.use('/api/users', userRouter)
app.use('/api/robots', robotRouter)
app.use('/api/votes', voteRouter)
app.use('/api', authRouter)

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '.', 'public', 'index.html'))
})

module.exports = app
