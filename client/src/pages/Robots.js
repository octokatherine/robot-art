import { Box, PrimaryButton } from '../components/base'
import withAuth from '../components/withAuth'
import RobotCard from '../components/RobotCard'

const Robots = ({ robots, setRobots }) => {
  return (
    <Box px={[3, 4]}>
      <h1>Robots</h1>
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(400px, max-content))"
        gridGap={3}
        maxWidth="1300px"
        mx="auto"
        justifyContent="center"
        justifyItems="center"
      >
        {robots.map((robot) => (
          <RobotCard key={robot.id} name={robot.name} image={robot.image}>
            <PrimaryButton width="150px">Vote</PrimaryButton>
          </RobotCard>
        ))}
      </Box>
    </Box>
  )
}

export default withAuth(Robots)
