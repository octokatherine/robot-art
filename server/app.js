const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const userRouter = require('./routers/userRouter')
const robotRouter = require('./routers/robotRouter')
const voteRouter = require('./routers/voteRouter')
const prisma = require('./prismaConnection')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const withAuth = require('./middleware')
const { sign_s3 } = require('./awsUpload')

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '.', 'public')))

app.use('/users', userRouter)
app.use('/robots', robotRouter)
app.use('/votes', voteRouter)

app.post('/sign_s3', sign_s3)

app.post('/login', async (req, res) => {
  const { username, password } = req.body
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
      const payload = { username, fullname: user.fullname, userId: user.id }
      const token = jwt.sign(payload, process.env.SECRET, {
        expiresIn: '1h',
      })
      res.cookie('token', token, { httpOnly: true }).status(200).json({ token: token })
    }
  })
})

app.delete('/logout', async (req, res) => {
  res.cookie('token', '').sendStatus(200)
})

app.get('/checkToken', withAuth, function (req, res) {
  res.status(200).json({ token: req.cookies.token })
})

app.get('/checkAdmin', withAuth, async function (req, res) {
  const user = await prisma.user.findFirst({
    where: {
      username: req.username,
    },
  })
  if (user.isAdmin) {
    return res.status(200).json({ admin: true })
  } else {
    return res.status(401).json({ error: 'user is not an admin' })
  }
})

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '.', 'public', 'index.html'))
})

module.exports = app
