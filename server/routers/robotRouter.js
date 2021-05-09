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
  const robots = await prisma.robot.findMany()
  res.status(200).json(robots)
})

robotRouter.put('/:id', withAuth, async (req, res) => {
  const updatedRobot = await prisma.robot.update({
    where: { id: req.params.id },
    data: { ...req.body },
  })
  res.status(200).json(updatedRobot)
})

module.exports = robotRouter