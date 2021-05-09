import { useState, useEffect } from 'react'
import { Box, PrimaryButton } from '../components/base'
import withAuth from '../components/withAuth'
import RobotCard from '../components/RobotCard'
import axios from 'axios'

const Robots = ({ robots, setRobots }) => {
  const [userVotes, setUserVotes] = useState([])

  useEffect(() => {
    axios.get('/votes/me').then((res) => setUserVotes(res.data.map((vote) => vote.robotId)))
  }, [])

  const castVote = (robotId) => {
    axios.post(`/votes/${robotId}`).then((res) => console.log(res))
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
        mt={5}
        justifyContent="center"
        justifyItems="center"
      >
        {robots.map((robot) => (
          <RobotCard key={robot.id} name={robot.name} image={robot.image}>
            <PrimaryButton
              width="150px"
              disabled={userVotes.includes(robot.id)}
              onClick={() => castVote(robot.id)}
            >
              {userVotes.includes(robot.id) ? 'Vote Cast' : 'Vote'}
            </PrimaryButton>
          </RobotCard>
        ))}
      </Box>
    </Box>
  )
}

export default withAuth(Robots)
