const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const userRouter = require('./routers/userRouter')
const prisma = require('./prismaConnection')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const withAuth = require('./middleware')

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '.', 'public')))

app.use('/users', userRouter)

app.post('/login', async (req, res) => {
  const { username, fullname, password } = req.body
  const user = await prisma.user.findFirst({
    where: {
      username: username,
    },
  })
  if (!user) return res.status(401).json({ error: 'Incorrect username or password' })

  bcrypt.compare(password, user.password, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Internal error' })
    } else if (!result) {
      res.status(401).json({ error: 'Incorrect username or password' })
    } else {
      const payload = { username, fullname }
      const token = jwt.sign(payload, process.env.SECRET, {
        expiresIn: '1h',
      })
      res.cookie('token', token, { httpOnly: true }).sendStatus(200)
    }
  })
})

app.delete('/logout', async (req, res) => {
  res.cookie('token', '').sendStatus(200)
})

app.get('/checkToken', withAuth, function (req, res) {
  res.sendStatus(200)
})

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '.', 'public', 'index.html'))
})

module.exports = app
