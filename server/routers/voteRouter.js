const prisma = require('../../prismaConnection')
const express = require('express')
const withAuth = require('../middleware')

const voteRouter = express.Router()

voteRouter.get('/', withAuth, async (req, res) => {
  const votes = await prisma.votes.groupBy({
    by: ['robotId'],
    count: true,
  })
  res.status(200).json(votes)
})

voteRouter.get('/me', withAuth, async (req, res) => {
  const votes = await prisma.votes.findFirst({
    where: { userId: req.userId },
  })
  res.status(200).json(votes)
})

voteRouter.post('/:robotId', withAuth, async (req, res) => {
  const newVote = await prisma.votes.create({
    data: {
      userId: req.userId,
      robotId: Number(req.params.robotId),
    },
  })

  res.status(201).json(newVote)
})

module.exports = voteRouter
