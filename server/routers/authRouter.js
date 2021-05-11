const express = require('express')
const bcrypt = require('bcrypt')
const path = require('path')
const jwt = require('jsonwebtoken')
const { sign_s3 } = require('../awsUpload')
const withAuth = require('../middleware')
const prisma = require('../prismaConnection')

const authRouter = express.Router()

authRouter.post('/sign_s3', sign_s3)

authRouter.post('/login', async (req, res) => {
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

authRouter.delete('/logout', async (req, res) => {
  res.cookie('token', '').sendStatus(200)
})

authRouter.get('/checkToken', withAuth, function (req, res) {
  res.status(200).json({ token: req.cookies.token })
})

authRouter.get('/checkAdmin', withAuth, async function (req, res) {
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

module.exports = authRouter
