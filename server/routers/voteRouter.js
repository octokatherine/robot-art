const prisma = require('../prismaConnection')
const express = require('express')
const withAuth = require('../middleware')

const voteRouter = express.Router()

voteRouter.post('/', withAuth, async (req, res) => {
  const newVote = await prisma.vote.create({
    data: {
      ...req.body,
    },
  })

  res.status(201).json(newVote)
})

module.exports = voteRouter
