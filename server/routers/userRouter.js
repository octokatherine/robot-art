const prisma = require('../prismaConnection')
const express = require('express')

const userRouter = express.Router()

userRouter.post('/', async (req, res) => {
  const user = await prisma.user.create({
    data: {
      fullName: req.body.fullname,
      username: req.body.username,
      password: req.body.password,
      isAdmin: false,
    },
  })
  res.status(201).json(user)
})

module.exports = userRouter
