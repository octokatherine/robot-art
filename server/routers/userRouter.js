const prisma = require('../prismaConnection')
const express = require('express')
const bcrypt = require('bcrypt')
const saltRounds = 10

const userRouter = express.Router()

userRouter.post('/', async (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
    const user = await prisma.user.create({
      data: {
        fullname: req.body.fullname,
        username: req.body.username,
        password: hash,
        isAdmin: false,
      },
    })
    res.status(201).json(user)
  })
})

module.exports = userRouter
