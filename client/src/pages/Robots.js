import { useEffect } from 'react'
import { Box, PrimaryButton } from '../components/base'
import withAuth from '../components/withAuth'
import RobotCard from '../components/RobotCard'
import axios from 'axios'

const Robots = ({ robots, setRobots, userVote, setUserVote }) => {
  useEffect(() => {
    axios.get('/api/votes/me').then((res) => {
      if (res.data) {
        setUserVote(res.data.robotId)
      }
    })
  }, [])

  const castVote = (robotId) => {
    if (userVote) {
      alert('You can only vote on one robot')
    } else {
      axios.post(`/api/votes/${robotId}`).then((res) => {
        setUserVote(res.data.robotId)
        setRobots((prev) => {
          return prev.map((robot) => {
            if (robot.id === robotId) {
              robot.votes = [...robot.votes, res.data]
            }
            return robot
          })
        })
      })
    }
  }

  return (
    <Box px={[3, 4]}>
      <h1>Robots</h1>
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(400px, max-content))"
        gridGap={3}
        maxWidth="1300px"
        mx="auto"
        my={5}
        justifyContent="center"
        justifyItems="center"
      >
        {robots.map((robot) => (
          <RobotCard key={robot.id} name={robot.name} image={robot.image}>
            <PrimaryButton
              width="150px"
              disabled={userVote === robot.id}
              onClick={() => castVote(robot.id)}
            >
              {userVote === robot.id ? 'Vote Cast' : 'Vote'}
            </PrimaryButton>
          </RobotCard>
        ))}
      </Box>
    </Box>
  )
}

export default withAuth(Robots)
