const prisma = require('../prismaConnection')
const express = require('express')
const withAuth = require('../middleware')

const robotRouter = express.Router()

robotRouter.post('/', withAuth, async (req, res) => {
  const newRobot = await prisma.robot.create({
    data: {
      ...req.body,
    },
  })

  res.status(201).json(newRobot)
})

robotRouter.get('/', withAuth, async (req, res) => {
  const robots = await prisma.robot.findMany({
    include: { votes: true },
  })
  res.status(200).json(robots)
})

robotRouter.put('/:id', withAuth, async (req, res) => {
  const updatedRobot = await prisma.robot.update({
    where: { id: Number(req.params.id) },
    data: { ...req.body },
  })
  res.status(200).json(updatedRobot)
})

robotRouter.delete('/:id', withAuth, async (req, res) => {
  await prisma.votes.deleteMany({
    where: { robotId: Number(req.params.id) },
  })
  const deletedRobot = await prisma.robot.delete({
    where: { id: Number(req.params.id) },
  })
  res.status(200).json(deletedRobot)
})

module.exports = robotRouter
